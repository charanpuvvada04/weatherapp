"""
threads_demo.py — Single-thread vs Multi-thread
Demonstrates: I/O-bound (downloads) vs CPU-bound (math loop)
Usage: python3 threads_demo.py
"""

import time
import threading
import urllib.request

URLS = [f"https://httpbin.org/get?n={i}" for i in range(20)]


# ─── Experiment A: I/O-bound — downloading URLs ───────────────────────────

def download_single():
    """Download 20 URLs one at a time."""
    for url in URLS:
        urllib.request.urlopen(url, timeout=15).read()


def download_one(url):
    urllib.request.urlopen(url, timeout=15).read()


def download_multi():
    """Download 20 URLs with 20 threads simultaneously."""
    threads = [threading.Thread(target=download_one, args=(u,)) for u in URLS]
    for t in threads:
        t.start()
    for t in threads:
        t.join()


# ─── Experiment B: CPU-bound — heavy math ────────────────────────────────

def heavy_math():
    """10 million multiplications — pure CPU work."""
    total = 0
    for i in range(10_000_000):
        total += i * i
    return total


# ─── Run both experiments ─────────────────────────────────────────────────

def run():
    print("\n" + "=" * 52)
    print("  Threads Demo — Teric Academy Week 1")
    print("=" * 52)

    # --- I/O-bound ---
    print("\nExperiment A: Download 20 URLs")
    print("-" * 34)

    print("  Single-thread: downloading...", end="", flush=True)
    t0 = time.time()
    download_single()
    single_io = time.time() - t0
    print(f"  {single_io:.2f}s")

    print("  Multi-thread:  downloading...", end="", flush=True)
    t0 = time.time()
    download_multi()
    multi_io = time.time() - t0
    print(f"  {multi_io:.2f}s")

    speedup_io = single_io / multi_io if multi_io > 0 else 0
    print(f"\n  Speedup: {speedup_io:.1f}x faster with threads ✓")
    print(f"  (Threads helped because CPU was idle waiting for network)")

    # --- CPU-bound ---
    print("\nExperiment B: Math loop × 2  (CPU-bound)")
    print("-" * 42)

    print("  Single-thread: calculating...", end="", flush=True)
    t0 = time.time()
    heavy_math()
    heavy_math()
    single_cpu = time.time() - t0
    print(f"  {single_cpu:.2f}s")

    print("  Multi-thread:  calculating...", end="", flush=True)
    t0 = time.time()
    t1 = threading.Thread(target=heavy_math)
    t2 = threading.Thread(target=heavy_math)
    t1.start(); t2.start()
    t1.join();  t2.join()
    multi_cpu = time.time() - t0
    print(f"  {multi_cpu:.2f}s")

    print(f"\n  Speedup: {single_cpu / multi_cpu:.2f}x  (barely any difference)")
    print(f"  (Threads did NOT help — Python GIL blocks true CPU parallelism)")
    print(f"  (Use multiprocessing for CPU-bound tasks instead)")

    # --- Summary ---
    print("\n" + "=" * 52)
    print("  Summary")
    print("=" * 52)
    print(f"  I/O-bound  → threads help    → {speedup_io:.1f}x speedup")
    print(f"  CPU-bound  → threads don't   → ~1.0x (same or slower)")
    print(f"\n  Rule: threads = waiting tasks | processes = math tasks")
    print("=" * 52 + "\n")


if __name__ == "__main__":
    run()
