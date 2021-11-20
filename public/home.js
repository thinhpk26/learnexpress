const container = document.querySelector('.user')
const pagination = document.querySelector('.pagination > span')
let currentpage = 1
axios({
    method: 'get',
    url: '../divideApi/user?page=1',
})
    .then(res => {
        const data = res.data.users
        const totalPage = Math.ceil(res.data.total / res.data.pageSize)
        let listpage = ''
        for(let i=1; i<=totalPage; ++i) {
            const tg = listpage
            listpage = tg.concat(`<li class="page-item"><a class="page-link" onclick="page(${i})">${i}</a></li>`)
        }
        pagination.innerHTML = listpage

        const htmls = data.map(item => {
            return (`<h1>Username: ${item.username}<h1>
                    <h1>Password: ${item.password}<h1>`)
        }).join('')
        container.innerHTML = htmls
    })
    .catch(err => {
        console.log(err)
    })

function page(numberpage) {
    axios({
        method: 'get',
        url: '../divideApi/user?page=' + numberpage,
    })
        .then(res => {
            const data = res.data.users
            const htmls = data.map(item => {
                return (`<h1>Username: ${item.username}<h1>
                        <h1>Password: ${item.password}<h1>`)
            }).join('')
            container.innerHTML = htmls
            currentpage = numberpage
        })
        .catch(err => {
            console.log(err)
        })
}

function next() {
    if(currentpage >= 10) {
        currentpage = 0
    }
    page(currentpage + 1)
}

function prev() {
    if(currentpage <= 1) {
        currentpage = 11
    }
    page(currentpage - 1)
}
