kaboom({
    global: true,
    fullscreen: true,
    scale: 1.1,
    debug: true,
    clearColor: [0,0,0,1]
})

const MOVE_SPEED = 120
const ENEMY_SPEED = 20
const JUMP_FORCE = 460
const BIG_JUMP_FORCE = 550
let CURRENT_JUMP_FORCE = JUMP_FORCE


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

scene('game', ({score}) =>{
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
        '   #*      ===    =          =                                  ',
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
        '$': [sprite('coin'), solid(), area(), 'coin'],
        '#': [sprite('surprise'), solid(), area(), 'coin-surprise'],
        '*': [sprite('surprise'), solid(), area() , 'mushroom-surprise'],
        '}': [sprite('unboxed'), solid(), area()],
        '(': [sprite('pipe-bottom-left'), solid(), area()],
        ')': [sprite('pipe-bottom-right'), solid(), area()],
        '-': [sprite('pipe-top-left'), solid(), area()],
        '+': [sprite('pipe-top-right'), solid(), area()],
        '^': [sprite('mushroom'), 'mushroom', body(), area()],
        '%': [sprite('evil-shroom'), solid(), area(), 'dangerous']
    }

    const gameLevel = addLevel(map, levelCfg)

    const scoreLabel = add([
        text(score),
        pos(30,6),
        layer('ui'),
        {
            value: score,
        }
    ])

    add([text('level' + 'test', pos(4,6))])

    function big() {
        let timer = 0
        let isBig = false
        return {
            update(){
                if (isBig){
                    timer -= dt()
                    if (timer <= 0){
                        this.smallify()
                    }
                }
            },
            isBig(){
                return isBig
            },
            smallify(){
                this.scale = vec2(1)
                timer = 0
                isBig = false
            },
            biggify(time){
                this.scale = vec2(2)
                CURRENT_JUMP_FORCE = BIG_JUMP_FORCE
                timer = time
                isBig = true
            }
        }
    }

    const player = add([
        sprite('mario'), area(), solid(),
        pos(30,5),
        body(),
        big(),
        origin('bot')
    ])

    action('mushroom', (m) => {
        m.move(13, 0)
    })

    player.on("headbutt", (obj) =>{
        if (obj.is('coin-surprise')){
            gameLevel.spawn('$', obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0,0))
        }
        if (obj.is('mushroom-surprise')){
            gameLevel.spawn('^', obj.gridPos.sub(0,1))
            destroy(obj)
            gameLevel.spawn('}', obj.gridPos.sub(0,0))
        }
    })


    player.action( () => {
        player.pushOutAll();
    })

    action('dangerous', (d) => {
        d.move(-ENEMY_SPEED, 0)
    })

    player.collides('mushroom', (m) => {
        destroy(m)
        player.biggify(6)
    })

    player.collides('dangerous', () => {
        go('lose', {score: scoreLabel.value})
    })

    player.collides('coin', (c) => {
        destroy(c)
        scoreLabel.value++
        scoreLabel.text = scoreLabel.value
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
            player.jump(CURRENT_JUMP_FORCE)
        }
    })
    
 
})

scene('lose', ({score}) => {
    add([text(score, 32), origin('center'), pos(width()/2, height()/2)])
})

go('game', {score: 0})