kaboom({
    global: true,
    fullscreen: true,
    scale: 1.1,
    debug: true,
    clearColor: [0,0,0,1]
})

const MOVE_SPEED = 120
const JUMP_FORCE = 460

loadRoot('https://i.imgur.com/')
loadSprite('coin', 'wbKxhcd.png')
loadSprite('evil-shroom', 'KPO3fR9.png')
loadSprite('brick', 'pogC9x5.png')
loadSprite('block', 'M6rwarW.png')
loadSprite('mario', 'Wb1qfhK.png')
loadSprite('mushroom', '0wMd92p.png')
loadSprite('surprise', 'gesQ1KP.png')
loadSprite('unboxed', 'bdrLpi6.png')
loadSprite('pipe-top-left', 'ReTPiWY.png')
loadSprite('pipe-top-right', 'hj2GK4n.png')
loadSprite('pipe-bottom-left', 'c1cYSbt.png')
loadSprite('pipe-bottom-right', 'nqQ79eI.png')

scene('game', () =>{
    layers(['bg','obj','ui'], 'obj')

    const map = [
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                                                                ',
        '                   $   $                                        ',
        '               $     ^    $                                     ',
        '       $             =           #*                             ',
        '         ===    =          =                                    ',
        '                                                                ',
        '                                                                ',
        '                                           -+                   ',
        '                             %          %  ()                   ',
        '===============================================      ==========='
    ]

    const levelCfg = {
        width: 20,
        height: 20,
        '=': [sprite('block'), solid(), area()],
        '$': [sprite('coin')],
        '#': [sprite('surprise'), solid(), area(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), area() , 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid(), area()],
        '(': [sprite('pipe-bottom-left'), solid(), area()],
        ')': [sprite('pipe-bottom-right'), solid(), area()],
        '-': [sprite('pipe-top-left'), solid(), area()],
        '+': [sprite('pipe-top-right'), solid(), area()],
        '^': [sprite('mushroom')],
        '%': [sprite('evil-shroom',)]
    }

    const gameLevel = addLevel(map, levelCfg)

    const scoreLabel = add([
        text("Kirby is the best <3"),
        pos(30,6),
        layer('ui'),
        {
            value: "Kirby is the best <3",
        }
    ])

    add([text('level' + 'test', pos(4,6))])

    const player = add([
        sprite('mario'), area(), solid(),
        pos(30,5),
        body(),
        origin('bot')
    ])


    player.action( () => {
        player.pushOutAll();
    })



    keyDown('left', () => {
        player.move(-MOVE_SPEED, 0)
    })
    keyDown("left", () => {
        player.move(-MOVE_SPEED, 0);
    });

    keyDown('right', () => {
        player.move(MOVE_SPEED, 0)
    })

    keyPress('space', () => {
        if(player.grounded()) {
            player.jump(JUMP_FORCE)
        }
    })
    
 
})

go('game')