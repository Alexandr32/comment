class Comment {

    // Нативный компонент из template
    nativeComponent

    // Место для размещения дочерних элементов
    #componentsChildrenList

    #title = ''
    #inputValue = ''

    constructor(title) {

        this.#title = title

        try {
            this.nativeComponent = templateComment?.content?.cloneNode(true)
        } catch (error) {
            throw new Error(`При создании комментария произошла ошибка в шаблоне: ${error}`)
        }

        const commentElement = this.nativeComponent?.querySelector('#comment')
        if(!commentElement) {
            throw new Error('Элемент id = comment не найден')
        }

        commentElement?.append(title)

        this.#componentsChildrenList = this.nativeComponent.querySelector('#commentsList')
        if(!this.#componentsChildrenList) {
            throw new Error('Элемент id = commentsList не найден')
        }

        this.#registrationEventClickAddButton()
        this.#registrationEventInputValue()
    }

    #registrationEventClickAddButton() {
        const button = this.nativeComponent?.querySelector('button')

        button?.addEventListener('click', () => {
            this.#addCommentInside()
        });
    }

    #registrationEventInputValue() {
        const input = this.nativeComponent?.querySelector('input')
        input?.addEventListener('input', (event) => {
            this.#inputValue = event.target.value
        });
    }

    #addCommentInside() {
        const title = `${this.#title} => ${this.#inputValue}`

        try {

            const newComment = new Comment(title)
            this.#componentsChildrenList?.appendChild(newComment.nativeComponent)

        } catch (error) {
            console.error(`При добавлении вложенного коментария произошла ошибка: ${error}`)
        }
    }

}

function addStartComment() {
    let commentsList = document.createElement('div');

    try {
        const newComment = new Comment('Новый комментарий')
        commentsList.append(newComment.nativeComponent)
        document.getElementById('comments').append(commentsList);

    } catch (error) {
        console.error(`При добавлении нового коментария произошла ошибка: ${error}`)
    }


}

// Создаем первый комментарий
this.addStartComment()
