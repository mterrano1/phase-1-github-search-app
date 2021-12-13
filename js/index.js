const init = () => {
    const inputForm = document.querySelector('form');

    inputForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = document.querySelector('input#search');

        fetch(`https://api.github.com/users/${input.value}`)
        .then(res => res.json())
        .then(data => {

            const profile = data.url;
            const user = data.login;
            const img = new Image(200, 200);
            img.src = data.avatar_url;
            const btn = document.createElement('button');
            btn.innerText = 'Repositories';
            const userInfo = [user, profile, img, btn];
            const userList = document.querySelector('#user-list');
            const reposList = document.querySelector('#repos-list');

            userInfo.forEach(function(item, i){
                const li = document.createElement('li');
                li.classList.add(i+1);
                if (item === user || item === profile) {
                    let text = document.createTextNode(item);
                    li.appendChild(text);
                    userList.appendChild(li);
                }
                else if(item === img){
                    let text = img
                    li.appendChild(text);
                    userList.appendChild(li);
                }
                else if(item === btn){
                    let text = btn
                    li.appendChild(text);
                    userList.appendChild(li);
                    const grabButton = document.querySelector('button');
                    grabButton.addEventListener('click', () => {
                        fetch(`https://api.github.com/users/${input.value}/repos`)
                        .then(res => res.json())
                        .then(data => {
                            data.forEach(function (repo, i){
                                const anchor = document.createElement('a');
                                const secondUl = document.createElement('li');
                                secondUl.classList.add(i+1);
                                reposList.appendChild(secondUl);
                                reposList.appendChild(anchor);
                                anchor.setAttribute('href', repo.html_url)
                                anchor.innerText = repo.name 

                            })
                        })
                    })
                }  
            })
        })
    })
}


document.addEventListener('DOMContentLoaded', init);
