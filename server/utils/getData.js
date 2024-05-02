function getData() {

    const uls = document.querySelectorAll("ul");

    function getUlData(container) {
        const arr = [];
        for (let item of [...container.querySelectorAll('li')]) {
            const img = item?.querySelector('article')?.querySelector('img')?.getAttribute('src');
            const d = [...item.querySelectorAll("p")].map(d => d.innerText).filter(d => d);
            arr.push({ img, title: d[0], location: d[1], description: d[2] })
        }
        return arr.filter(d => d.img);
    }

    const arr = [];
    for (let ul of uls) {
        arr.push(...getUlData(ul));
    }

    return JSON.stringify(arr);
}

getData()