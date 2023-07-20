import { _decorator, Component, DistanceJoint2D, EPhysics2DDrawFlags, Graphics, misc, Node, PhysicsSystem2D, Quat, RigidBody2D, Sprite, SpriteFrame, Tween, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('controller2')
export class controller2 extends Component {

    @property(Node)
    card: Node = null;

    @property(Graphics)
    graphics: Graphics = null;

    private L = 10; // Chiều dài
    private g = 9.8; // Trọng trường
    private b = 2;   // Hệ số b
    private m = 5;   // Hệ số m


    start() {
        this.scheduleOnce(() => {
            let that = this;
            this.card._uiProps.uiTransformComp.setAnchorPoint(new Vec2(0.5, 1));

            let cycleStart = misc.radiansToDegrees(Math.asin(this.card.position.x / Math.abs(this.card.position.x))) / this.card.position.y;

            tween({ width: Math.abs(this.card.position.x), deltaLength: this.card.position.y, cycle: cycleStart })
                .to(7, { width: 0, deltaLength: 1000, cycle: 0.5 }, {
                    easing: 'linear',
                    onUpdate(target: { width: number, deltaLength: number, cycle: number; }, ratio) {
                        console.log(misc.degreesToRadians(target.deltaLength * target.cycle) / Math.PI);

                        let x = target.width * Math.sin(misc.degreesToRadians(target.deltaLength * target.cycle));
                        that.card.position = new Vec3(x, target.deltaLength, 0);

                        that.changeAngle(new Vec3(0, 1000, 0), that.card);

                        that.graphics.clear();
                        that.graphics.moveTo(0, 1000);
                        that.graphics.lineTo(that.card.position.x, that.card.position.y);
                        that.graphics.stroke();
                    },
                })
                .start();
        }, 1);
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


