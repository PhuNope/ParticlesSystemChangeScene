import { _decorator, Component, misc, Node, Quat, Sprite, SpriteFrame, Tween, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('controller2')
export class controller2 extends Component {

    @property(Node)
    card: Node = null;

    start() {
        let that = this;
        this.card._uiProps.uiTransformComp.setAnchorPoint(new Vec2(0.5, 1));
        let x = 300;
        tween({ x: 300, y: 0 })
            .to(5, { x: 0, y: 600 }, {
                onUpdate(target: { x: number, y: number; }, ratio) {
                    let x = target.x * Math.sin(misc.degreesToRadians(target.y * 2.5));
                    that.card.position = new Vec3(x, target.y, 0);

                    that.changeAngle(new Vec3(0, 600, 0), that.card);
                },
            })
            .start();
    }

    changeAngle(direct: Vec3, target: Node) {
        let angle = Vec3.angle(new Vec3(0, 1, 0), direct.subtract(target.position));
        angle = misc.radiansToDegrees(angle);
        direct.x < target.position.x ? angle = angle : angle = -angle;

        target.angle = angle;
    }

    update(deltaTime: number) {

    }

    protected onDestroy(): void {
        Tween.stopAll();
    }
}


