module.exports = {
    "*.{ts,tsx}": [
        () => "yarn ts-check",
        "yarn lint-fix",
    ],
}
