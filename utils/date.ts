

export function getStartOfMonth(): number {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1).getTime()
}

export function getStartOfNextMonth(): number {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime()
}