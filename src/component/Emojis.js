import React from 'react'

const Emojis = () => {

    let addEmojiToChat = (emoji) => {
        let input_field = document.querySelector('#id_message')
        input_field.value += emoji
    }

    return (
        <div className="emojis">
                    <span onClick={() => addEmojiToChat('😀')}>😀</span>
                    <span onClick={() => addEmojiToChat('😃')}>😃</span>
                    <span onClick={() => addEmojiToChat('😄')}>😄</span>
                    <span onClick={() => addEmojiToChat('😁')}>😁</span>
                    <span onClick={() => addEmojiToChat('😆')}>😆</span>
                    <span onClick={() => addEmojiToChat('😅')}>😅</span>
                    <span onClick={() => addEmojiToChat('😂')}>😂</span>
                    <span onClick={() => addEmojiToChat('🤣')}>🤣</span>
                    <span onClick={() => addEmojiToChat('😊')}>😊</span>
                    <span onClick={() => addEmojiToChat('🙂')}>🙂</span>
                    <span onClick={() => addEmojiToChat('🙃')}>🙃</span>
                    <span onClick={() => addEmojiToChat('😉')}>😉</span>
                    <span onClick={() => addEmojiToChat('😌')}>😌</span>
                    <span onClick={() => addEmojiToChat('😍')}>😍</span>
                    <span onClick={() => addEmojiToChat('🥰')}>🥰</span>
                    <span onClick={() => addEmojiToChat('😘')}>😘</span>
                    <span onClick={() => addEmojiToChat('😗')}>😗</span>
                    <span onClick={() => addEmojiToChat('😙')}>😙</span>
                    <span onClick={() => addEmojiToChat('😚')}>😚</span>
                    <span onClick={() => addEmojiToChat('😋')}>😋</span>
                    <span onClick={() => addEmojiToChat('😛')}>😛</span>
                    <span onClick={() => addEmojiToChat('😝')}>😝</span>
                    <span onClick={() => addEmojiToChat('😜')}>😜</span>
                    <span onClick={() => addEmojiToChat('🤪')}>🤪</span>
                    <span onClick={() => addEmojiToChat('🤨')}>🤨</span>
                    <span onClick={() => addEmojiToChat('😎')}>😎</span>
                    <span onClick={() => addEmojiToChat('😏')}>😏</span>
                    <span onClick={() => addEmojiToChat('😒')}>😒</span>
                    <span onClick={() => addEmojiToChat('😞')}>😞</span>
                    <span onClick={() => addEmojiToChat('😔')}>😔</span>
                    <span onClick={() => addEmojiToChat('😟')}>😟</span>
                    <span onClick={() => addEmojiToChat('😕')}>😕</span>
                    <span onClick={() => addEmojiToChat('🙁')}>🙁</span>
                    <span onClick={() => addEmojiToChat('☹️')}>☹️</span>
                    <span onClick={() => addEmojiToChat('😢')}>😢</span>
                    <span onClick={() => addEmojiToChat('😭')}>😭</span>
                    <span onClick={() => addEmojiToChat('😠')}>😠</span>
                    <span onClick={() => addEmojiToChat('😳')}>😳</span>
                    <span onClick={() => addEmojiToChat('😱')}>😱</span>
                    <span onClick={() => addEmojiToChat('😨')}>😨</span>
                    <span onClick={() => addEmojiToChat('😰')}>😰</span>
                    <span onClick={() => addEmojiToChat('😥')}>😥</span>
                    <span onClick={() => addEmojiToChat('😓')}>😓</span>
                    <span onClick={() => addEmojiToChat('🤗')}>🤗</span>
                    <span onClick={() => addEmojiToChat('🤔')}>🤔</span>
                    <span onClick={() => addEmojiToChat('🗿')}>🗿</span>
        </div>
    )
}

export default Emojis
