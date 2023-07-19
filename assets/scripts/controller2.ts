import { _decorator, Component, Node, Sprite, SpriteFrame, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('controller2')
export class controller2 extends Component {

    @property(Node)
    card1: Node;
    @property(Node)
    card2: Node;

    @property(SpriteFrame)
    front: SpriteFrame;

    @property(SpriteFrame)
    back: SpriteFrame;

    start() {
        let that = this;
        tween({ scale: 1 })
            .parallel(
                tween({ scale: 1 })
                    .to(1.5, { scale: 0 }, {
                        onUpdate(target: { scale: number; }, ratio) {
                            that.card1.setScale(new Vec3(target.scale, 1, 1));
                            if (target.scale <= 0.2) {
                                that.card1.getComponent(Sprite).spriteFrame = that.back;
                            } else {
                                that.card1.getComponent(Sprite).spriteFrame = that.front;
                            }
                        },
                    })
                    .to(1.5, { scale: 1 }, {
                        onUpdate(target: { scale: number; }, ratio) {
                            that.card1.setScale(new Vec3(target.scale, 1, 1));
                            if (target.scale <= 0.2) {
                                that.card1.getComponent(Sprite).spriteFrame = that.back;
                            } else {
                                that.card1.getComponent(Sprite).spriteFrame = that.front;
                            }
                        },
                    })
                    .start(),

                tween({ scale: 0.8 })
                    .to(1, { scale: 0.2 }, {
                        onUpdate(target: { scale: number; }, ratio) {
                            that.card2.setScale(new Vec3(target.scale, 1, 1));
                        },
                    })
                    .to(1, { scale: 0.8 }, {
                        onUpdate(target: { scale: number; }, ratio) {
                            that.card2.setScale(new Vec3(target.scale, 1, 1));
                        },
                    })
                    .start()
            )
            .repeatForever()
            .start();
    }

    update(deltaTime: number) {

    }
}


