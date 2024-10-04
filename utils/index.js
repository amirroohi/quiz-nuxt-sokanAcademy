export function level(exam, total) {
    if (exam.correct / total >= 0.8 && exam.ended_at) return "عالی";
    else if (exam.correct / total >= 0.5 && exam.ended_at) return "متوسط";
    else if (exam.correct / total < 0.5 && exam.ended_at) return "ضعیف";
    else return "نامشخص";
}
export function tableLevelColor(level) {
    switch (level) {
        case "عالی":
            return "good"

        case "متوسط":
            return "average"

        case "ضعیف":
            return "weak"
        default:
            return;
    }
}
export function tableLevelIcon(level) {
    switch (level) {
        case "عالی":
            return "emoji-happy"

        case "متوسط":
            return "emoji-poker"

        case "ضعیف":
            return "emoji-sad"
        default:
            return "emoji-poker";
    }
}