from typing import List, Tuple

def fifo(pages: List[int], frames: int) -> Tuple[int, list]:
    memory: List[int] = []
    pointer = 0
    faults = 0
    history = []  # list of (page, is_hit, snapshot)

    for p in pages:
        hit = p in memory
        if not hit:
            faults += 1
            if len(memory) < frames:
                memory.append(p)
            else:
                memory[pointer] = p
                pointer = (pointer + 1) % frames
        snap = memory.copy() + [None] * (frames - len(memory))
        history.append((p, hit, snap))
    return faults, history


def lru(pages: List[int], frames: int) -> Tuple[int, list]:
    memory: List[int] = []
    recent = {}   # page -> last index seen
    faults = 0
    history = []

    for i, p in enumerate(pages):
        hit = p in memory
        if not hit:
            faults += 1
            if len(memory) < frames:
                memory.append(p)
            else:
                # evict least recently used among current memory pages
                victim = min(memory, key=lambda x: recent.get(x, -1))
                memory[memory.index(victim)] = p
        recent[p] = i
        snap = memory.copy() + [None] * (frames - len(memory))
        history.append((p, hit, snap))
    return faults, history


def optimal(pages: List[int], frames: int) -> Tuple[int, list]:
    memory: List[int] = []
    faults = 0
    history = []

    for i, p in enumerate(pages):
        hit = p in memory
        if not hit:
            faults += 1
            if len(memory) < frames:
                memory.append(p)
            else:
                future = pages[i+1:]
                farthest = -1
                victim = None
                for m in memory:
                    if m not in future:
                        victim = m
                        break
                    idx = future.index(m)
                    if idx > farthest:
                        farthest = idx
                        victim = m
                memory[memory.index(victim)] = p
        snap = memory.copy() + [None] * (frames - len(memory))
        history.append((p, hit, snap))
    return faults, history


def print_table(title: str, pages: List[int], history: list, frames: int):
    print(f"\n{title}")
    print("Pages → ", "  ".join(f"{p:>2}" for p in pages))
    print("-" * (10 + 4 * len(pages)))
    # extract rows
    rows = [["-" for _ in pages] for _ in range(frames)]
    marks = []
    for j, (_, is_hit, snap) in enumerate(history):
        for r in range(frames):
            rows[r][j] = "-" if snap[r] is None else str(snap[r])
        marks.append("H" if is_hit else "F")
    for r in range(frames):
        print(f"F{r+1:<2}      ", "  ".join(f"{c:>2}" for c in rows[r]))
    print("Hit/Fault ", "  ".join(marks))


if __name__ == "__main__":
    pages = [2, 5, 1, 2, 8, 5, 2, 1, 9, 8, 5, 2]
    frames = 3

    for name, fn in [("FIFO", fifo), ("LRU", lru), ("Optimal", optimal)]:
        faults, hist = fn(pages, frames)
        print_table(name, pages, hist, frames)
        print(f"Total {name} page faults = {faults}")
