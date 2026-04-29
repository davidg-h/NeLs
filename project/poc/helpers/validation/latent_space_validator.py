"""Latent-space validation routines.

The validator combines geometric checks with optional label-aware and
decoder-aware diagnostics. It is designed to support notebook-first review
before methods are promoted into production ComfyUI components.
"""

from __future__ import annotations
import numpy as np
from sklearn.metrics import pairwise_distances
from sklearn.preprocessing import normalize


class LatentSpaceValidator:
    """Run structured health checks on a latent embedding set.

    The class expects four core geometric checks to exist on the instance:
    ``test_not_random``, ``test_intrinsic_dimensionality``,
    ``test_neighborhood_stability``, and ``test_not_collapsed``.
    """

    def __init__(self, vectors, labels=None, decoder=None, verbose=True):
        """Create a validator for one latent-space snapshot.

        Args:
            vectors: Latent matrix shaped ``[N, D]``.
            labels: Optional semantic labels for supervised diagnostics.
            decoder: Optional callable mapping latent vectors back to feature
                or image-like representations.
            verbose: Whether to print per-test status to stdout.
        """
        self.raw = vectors
        self.vectors = normalize(vectors)
        self.N, self.D = self.vectors.shape
        self.labels = labels
        self.decoder = decoder
        self.verbose = verbose
        self.results = {}

    # -- CORE GEOMETRIC TESTS --
    # test_not_random()
    # test_intrinsic_dimensionality()
    # test_neighborhood_stability()
    # test_not_collapsed()

    # LABEL TESTS:

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
        # Clamp folds to avoid invalid CV when sample count is small.
        cv = min(5, self.N // n_classes)
        scores = cross_val_score(clf, self.vectors, y, cv=cv)
        accuracy = scores.mean()

        # Require meaningful lift over naive chance prediction.
        passed = accuracy > chance * 1.5

        return {
            "passed": passed,
            "accuracy": round(accuracy, 4),
            "chance_level": round(chance, 4),
            "lift_over_chance": round(accuracy / chance, 4),
            "interpretation": (
                f"Linear probe: {accuracy:.0%} accuracy ({accuracy / chance:.1f}x chance)"
                if passed
                else f"Linear probe: {accuracy:.0%} - barely above chance ({chance:.0%})"
            ),
        }

    def test_distance_label_correlation(self):
        """Are same-label pairs closer than cross-label pairs?"""
        from itertools import combinations

        dists = pairwise_distances(self.vectors, metric="cosine")
        labels = np.array(self.labels)

        same_dists, cross_dists = [], []
        # Pairwise loops are O(n^2); cap size for responsive notebook runs.
        indices = list(range(min(200, self.N)))

        for i, j in combinations(indices, 2):
            d = dists[i, j]
            if labels[i] == labels[j]:
                same_dists.append(d)
            else:
                cross_dists.append(d)

        mean_same = float(np.mean(same_dists))
        mean_cross = float(np.mean(cross_dists))
        # Positive margin means same-label samples cluster more tightly.
        separation = mean_cross - mean_same

        passed = separation > 0.05

        return {
            "passed": passed,
            "mean_same_label_distance": round(mean_same, 4),
            "mean_cross_label_distance": round(mean_cross, 4),
            "separation_margin": round(separation, 4),
            "interpretation": (
                f"Same-label vectors are {separation:.3f} closer than cross-label"
                if passed
                else "No meaningful distance separation between labels"
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

        # ARI reference: 0 ~ random alignment, 1 = perfect label match.
        passed = ari > 0.2

        return {
            "passed": passed,
            "adjusted_rand_index": round(float(ari), 4),
            "interpretation": (
                f"Geometric clusters align with labels (ARI: {ari:.3f})"
                if passed
                else f"Clusters do not match labels (ARI: {ari:.3f}) - space may encode different concepts"
            ),
        }

    # DECODER TESTS:

    def test_reconstruction_fidelity(self, sample_size=20):
        """Does encode -> decode preserve meaning?"""
        indices = np.random.choice(self.N, min(sample_size, self.N), replace=False)
        scores = []

        for i in indices:
            original = self.raw[i]
            reconstructed = self.decoder(self.vectors[i])

            # Compare orientation, not magnitude, to tolerate scale shifts.
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
                f"Reconstruction fidelity: {mean_fidelity:.0%}"
                if passed
                else f"Poor reconstruction: {mean_fidelity:.0%} - decoder may not be compatible"
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

            # Adjacent decoded states should evolve gradually along the path.
            step_sims = [
                float(
                    cosine_similarity(
                        path[i].reshape(1, -1), path[i + 1].reshape(1, -1)
                    )[0][0]
                )
                for i in range(len(path) - 1)
            ]

            # Tolerate small non-monotonic jumps from decoder noise.
            diffs = np.diff(step_sims)
            smoothness = float(np.mean(diffs < 0.1))
            smoothness_scores.append(smoothness)

        mean_smoothness = float(np.mean(smoothness_scores))
        passed = mean_smoothness > 0.6

        return {
            "passed": passed,
            "mean_smoothness": round(mean_smoothness, 4),
            "interpretation": (
                "Interpolation is smooth - space is navigable"
                if passed
                else "Interpolation has jumps - space has discontinuities"
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

            # Good directional axes should be locally smooth and reversible.
            sim_pos_base = float(
                cosine_similarity(dec_pos.reshape(1, -1), dec_base.reshape(1, -1))[0][0]
            )
            sim_neg_base = float(
                cosine_similarity(dec_neg.reshape(1, -1), dec_base.reshape(1, -1))[0][0]
            )
            sim_pos_neg = float(
                cosine_similarity(dec_pos.reshape(1, -1), dec_neg.reshape(1, -1))[0][0]
            )

            # Positive score indicates meaningful but controlled directional move.
            consistency = (sim_pos_base + sim_neg_base) / 2 - sim_pos_neg
            consistencies.append(consistency)

        mean_consistency = float(np.mean(consistencies))
        passed = mean_consistency > 0.0

        return {
            "passed": passed,
            "mean_directional_consistency": round(mean_consistency, 4),
            "interpretation": (
                "Directions are consistent and reversible - space has steerable axes"
                if passed
                else "Movement is not consistent - directions do not map to stable concepts"
            ),
        }

    # -- MAIN ENTRY POINT --

    def validate(self):
        """Run all available checks and return a compact verdict summary."""
        core_tests = [
            ("Not Random", self.test_not_random),
            ("Intrinsic Dimensionality", self.test_intrinsic_dimensionality),
            ("Neighborhood Stability", self.test_neighborhood_stability),
            ("Not Collapsed", self.test_not_collapsed),
        ]
        # Enable optional suites only when required inputs are provided.
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
            print(f"  Input: {self.N} samples x {self.D} dims")
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
                status = "PASS" if result["passed"] else "FAIL"
                print(f"\n[{status}] {name}")
                print(f"  -> {result['interpretation']}")

        passed_count = sum(all_passed)
        total = len(all_passed)
        ratio = passed_count / total

        if ratio == 1.0:
            verdict = "FULLY VALID"
        elif ratio >= 0.75:
            verdict = "MOSTLY VALID - minor issues"
        elif ratio >= 0.5:
            verdict = "QUESTIONABLE - fix failing tests first"
        else:
            verdict = "INVALID"

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
