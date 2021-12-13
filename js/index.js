const init = () => {
    const inputForm = document.querySelector('form');

    inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('input#search');

        console.log(input.value)

        fetch(`https://api.github.com/users/${input.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const li = document.createElement('li');
            const img = document.createElement('img');
            const div = document.querySelector('#github-container');
            const userList = document.querySelector('#user-list');
            const reposList = document.querySelector('#repos-list');

            userList.append(`User: ${data.login}`, li)
            div.append(img.src=`${data.avatar_url}`)
            reposList.append(`Repos: ${data.repos_url}`, li)
        })
    })
}

document.addEventListener('DOMContentLoaded', init);