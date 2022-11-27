export const camelize = (str) => {
    let string = str
        .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
            return index === 0 ? word.toLowerCase() : word.toUpperCase()
        })
        .replace(/\s+/g, '')
    string === 'lCD' ? (string = 'lcd') : null
    return string.charAt(0).toLowerCase() + string.slice(1)
}
export const lookup = (i) => {
    const table = [
        'Screen Glass',
        'LCD',
        'Battery',
        'Charge Port',
        'Front Camera',
        'Rear Camera',
        'Ear Speaker',
        'Loud Speaker',
        'Rear Glass',
        'Liquid Damage',
    ]
    return table.filter((x) => camelize(x) === i)[0]
}
