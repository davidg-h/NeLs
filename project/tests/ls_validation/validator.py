class LatentSpaceValidator:
    def __init__(self, vectors, labels=None, decoder=None, verbose=True):
        self.raw = vectors
        self.vectors = normalize(vectors)
        self.N, self.D = self.vectors.shape
        self.labels = labels
        self.decoder = decoder
        self.verbose = verbose
        self.results = {}

    # ── EXISTING TESTS (unchanged) ──────────────────────
    # test_not_random()
    # test_intrinsic_dimensionality()
    # test_neighborhood_stability()
    # test_not_collapsed()

    # ── LABEL TESTS ─────────────────────────────────────

    def test_linear_separability(self):
        """Are label classes linearly separable?"""
        from sklearn.linear_model import LogisticRegression
        from sklearn.model_selection import cross_val_score
        from sklearn.preprocessing import LabelEncoder

        le = LabelEncoder()
        y = le.fit_transform(self.labels)
        n_classes = len(le.classes_)
        chance = 1 / n_classes

        clf = LogisticRegression(max_iter=1000)
        cv = min(5, self.N // n_classes)  # safe cv folds
        scores = cross_val_score(clf, self.vectors, y, cv=cv)
        accuracy = scores.mean()

        passed = accuracy > chance * 1.5  # at least 50% better than chance

        return {
            "passed": passed,
            "accuracy": round(accuracy, 4),
            "chance_level": round(chance, 4),
            "lift_over_chance": round(accuracy / chance, 4),
            "interpretation": (
                f"✅ Linear probe: {accuracy:.0%} accuracy ({accuracy / chance:.1f}x chance)"
                if passed
                else f"❌ Linear probe: {accuracy:.0%} — barely above chance ({chance:.0%})"
            ),
        }

    def test_distance_label_correlation(self):
        """Are same-label pairs closer than cross-label pairs?"""
        from itertools import combinations

        dists = pairwise_distances(self.vectors, metric="cosine")
        labels = np.array(self.labels)

        same_dists, cross_dists = [], []
        indices = list(range(min(200, self.N)))  # cap for performance

        for i, j in combinations(indices, 2):
            d = dists[i, j]
            if labels[i] == labels[j]:
                same_dists.append(d)
            else:
                cross_dists.append(d)

        mean_same = float(np.mean(same_dists))
        mean_cross = float(np.mean(cross_dists))
        separation = mean_cross - mean_same  # positive = good

        passed = separation > 0.05

        return {
            "passed": passed,
            "mean_same_label_distance": round(mean_same, 4),
            "mean_cross_label_distance": round(mean_cross, 4),
            "separation_margin": round(separation, 4),
            "interpretation": (
                f"✅ Same-label vectors are {separation:.3f} closer than cross-label"
                if passed
                else f"❌ No meaningful distance separation between labels"
            ),
        }

    def test_cluster_label_alignment(self):
        """Do geometric clusters map to label groups?"""
        from sklearn.cluster import KMeans
        from sklearn.metrics import adjusted_rand_score

        n_clusters = len(set(self.labels))
        kmeans = KMeans(n_clusters=n_clusters, n_init=10, random_state=42)
        cluster_assignments = kmeans.fit_predict(self.vectors)

        from sklearn.preprocessing import LabelEncoder

        y = LabelEncoder().fit_transform(self.labels)
        ari = adjusted_rand_score(y, cluster_assignments)

        # ARI: 0 = random, 1 = perfect, can be negative
        passed = ari > 0.2

        return {
            "passed": passed,
            "adjusted_rand_index": round(float(ari), 4),
            "interpretation": (
                f"✅ Geometric clusters align with labels (ARI: {ari:.3f})"
                if passed
                else f"❌ Clusters don't match labels (ARI: {ari:.3f}) — space may encode different concepts"
            ),
        }

    # ── DECODER TESTS ────────────────────────────────────

    def test_reconstruction_fidelity(self, sample_size=20):
        """Does encode → decode preserve meaning?"""
        indices = np.random.choice(self.N, min(sample_size, self.N), replace=False)
        scores = []

        for i in indices:
            original = self.raw[i]
            reconstructed = self.decoder(self.vectors[i])

            # Cosine similarity between original and reconstruction
            sim = float(
                np.dot(original, reconstructed)
                / (np.linalg.norm(original) * np.linalg.norm(reconstructed) + 1e-9)
            )
            scores.append(sim)

        mean_fidelity = float(np.mean(scores))
        passed = mean_fidelity > 0.85

        return {
            "passed": passed,
            "mean_reconstruction_similarity": round(mean_fidelity, 4),
            "min": round(float(np.min(scores)), 4),
            "max": round(float(np.max(scores)), 4),
            "interpretation": (
                f"✅ Reconstruction fidelity: {mean_fidelity:.0%}"
                if passed
                else f"❌ Poor reconstruction: {mean_fidelity:.0%} — decoder may not be compatible"
            ),
        }

    def test_interpolation_smoothness(self, n_pairs=5, steps=8):
        """Does walking between two points produce smooth semantic drift?"""
        from sklearn.metrics.pairwise import cosine_similarity

        smoothness_scores = []

        for _ in range(n_pairs):
            idx_a, idx_b = np.random.choice(self.N, 2, replace=False)
            path = []

            for t in np.linspace(0, 1, steps):
                interp = normalize(
                    ((1 - t) * self.vectors[idx_a] + t * self.vectors[idx_b]).reshape(
                        1, -1
                    )
                )[0]
                decoded = self.decoder(interp)
                path.append(decoded)

            # Measure step-to-step similarity — should decrease gradually
            step_sims = [
                float(
                    cosine_similarity(
                        path[i].reshape(1, -1), path[i + 1].reshape(1, -1)
                    )[0][0]
                )
                for i in range(len(path) - 1)
            ]

            # Check monotonically decreasing (or close to it)
            diffs = np.diff(step_sims)
            smoothness = float(
                np.mean(diffs < 0.1)
            )  # most steps should decrease similarity
            smoothness_scores.append(smoothness)

        mean_smoothness = float(np.mean(smoothness_scores))
        passed = mean_smoothness > 0.6

        return {
            "passed": passed,
            "mean_smoothness": round(mean_smoothness, 4),
            "interpretation": (
                f"✅ Interpolation is smooth — space is navigable"
                if passed
                else f"❌ Interpolation has jumps — space has discontinuities"
            ),
        }

    def test_directional_consistency(self, n_tests=10, epsilon=0.1):
        """Does moving in a direction produce consistent, reversible changes?"""
        from sklearn.metrics.pairwise import cosine_similarity

        consistencies = []
        random_dirs = normalize(np.random.randn(n_tests, self.D))

        for direction in random_dirs:
            base_idx = np.random.randint(self.N)
            base = self.vectors[base_idx]

            pos = normalize((base + epsilon * direction).reshape(1, -1))[0]
            neg = normalize((base - epsilon * direction).reshape(1, -1))[0]

            dec_pos = self.decoder(pos)
            dec_neg = self.decoder(neg)
            dec_base = self.decoder(base)

            # pos and neg should be different from each other but both close to base
            sim_pos_base = float(
                cosine_similarity(dec_pos.reshape(1, -1), dec_base.reshape(1, -1))[0][0]
            )
            sim_neg_base = float(
                cosine_similarity(dec_neg.reshape(1, -1), dec_base.reshape(1, -1))[0][0]
            )
            sim_pos_neg = float(
                cosine_similarity(dec_pos.reshape(1, -1), dec_neg.reshape(1, -1))[0][0]
            )

            # Good: pos and neg are close to base but different from each other
            consistency = (sim_pos_base + sim_neg_base) / 2 - sim_pos_neg
            consistencies.append(consistency)

        mean_consistency = float(np.mean(consistencies))
        passed = mean_consistency > 0.0

        return {
            "passed": passed,
            "mean_directional_consistency": round(mean_consistency, 4),
            "interpretation": (
                f"✅ Directions are consistent and reversible — space has steerable axes"
                if passed
                else f"❌ Movement is not consistent — directions don't map to stable concepts"
            ),
        }

    # ── MAIN ENTRY POINT ────────────────────────────────

    def validate(self):
        core_tests = [
            ("Not Random", self.test_not_random),
            ("Intrinsic Dimensionality", self.test_intrinsic_dimensionality),
            ("Neighborhood Stability", self.test_neighborhood_stability),
            ("Not Collapsed", self.test_not_collapsed),
        ]
        label_tests = (
            [
                ("Linear Separability", self.test_linear_separability),
                ("Distance-Label Correlation", self.test_distance_label_correlation),
                ("Cluster-Label Alignment", self.test_cluster_label_alignment),
            ]
            if self.labels is not None
            else []
        )

        decoder_tests = (
            [
                ("Reconstruction Fidelity", self.test_reconstruction_fidelity),
                ("Interpolation Smoothness", self.test_interpolation_smoothness),
                ("Directional Consistency", self.test_directional_consistency),
            ]
            if self.decoder is not None
            else []
        )

        all_tests = core_tests + label_tests + decoder_tests
        all_passed = []

        if self.verbose:
            mode = []
            if self.labels is not None:
                mode.append("labels")
            if self.decoder is not None:
                mode.append("decoder")
            mode_str = " + ".join(mode) if mode else "geometry only"
            print(f"\n{'=' * 55}")
            print(f"  Latent Space Validator [{mode_str}]")
            print(f"  Input: {self.N} samples × {self.D} dims")
            print(
                f"  Tests: {len(core_tests)} core"
                + (f" + {len(label_tests)} label" if label_tests else "")
                + (f" + {len(decoder_tests)} decoder" if decoder_tests else "")
            )
            print(f"{'=' * 55}")

        for name, fn in all_tests:
            result = fn()
            self.results[name] = result
            all_passed.append(result["passed"])
            if self.verbose:
                status = "✅ PASS" if result["passed"] else "❌ FAIL"
                print(f"\n[{status}] {name}")
                print(f"  → {result['interpretation']}")

        passed_count = sum(all_passed)
        total = len(all_passed)
        ratio = passed_count / total

        if ratio == 1.0:
            verdict = "✅ FULLY VALID"
        elif ratio >= 0.75:
            verdict = "⚠️  MOSTLY VALID — minor issues"
        elif ratio >= 0.5:
            verdict = "⚠️  QUESTIONABLE — fix failing tests first"
        else:
            verdict = "❌ INVALID"

        if self.verbose:
            print(f"\n{'=' * 55}")
            print(f"  VERDICT: {verdict}")
            print(f"  Passed: {passed_count}/{total}")
            print(f"{'=' * 55}\n")

        return {
            "verdict": verdict,
            "tests_passed": f"{passed_count}/{total}",
            "details": self.results,
        }
