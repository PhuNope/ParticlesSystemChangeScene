import { _decorator, Color, Component, director, Event, game, Material, misc, Node, ParticleSystem2D, resources, Sprite, SpriteAtlas, tween, Vec2, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

type TypeEffect = "Box" | "BurnOut" | "Circle" | "Linear" | "Random" | "Side" | "Wind";

@ccclass('controller')
export class controller extends Component {
    @property({
        type: Sprite,
        tooltip: 'sprite'
    })
    sprite: Sprite = null;

    @property({
        type: ParticleSystem2D,
        tooltip: 'sprite'
    })
    particle: ParticleSystem2D = null;

    @property({
        type: Material,
        tooltip: 'sprite'
    })
    material: Material[] = [];

    @property(Node)
    angleNode: Node = null;

    start() {
        // let mat = this.sprite.customMaterial;
        // // // this.particle.stopSystem();

        // // // this.scheduleOnce(() => {
        // // //     this.particle.enabled = true;
        // // this.particle.resetSystem();
        // tween(new Vec3(0, 0, 0))
        //     .to(2, new Vec3(1, 0, 0), {
        //         onUpdate(target: Vec3, ratio) {
        //             console.log(target.x);

        //             mat.setProperty("dissolveThreshold", target.x);
        //         },
        //     })
        //     .start();
        // }, 0.5);

        //     console.log(this.sequence.next()); // { value: 1, done: false }
        //     console.log(this.sequence.next()); // { value: 2, done: false }
        //     console.log(this.sequence.next()); // { value: 3, done: false }
        //     console.log(this.sequence.next());
        resources.load("card", SpriteAtlas, (err, atlas) => {

            let sf = this.sprite.spriteAtlas.getSpriteFrame("13");
            console.log(this.sprite.spriteAtlas);

            this.sprite.spriteFrame = sf;
        });

        //test angle
        let angle = Vec3.angle(this.angleNode.children[0].position, this.angleNode.children[1].position);

        console.log("angle: ", misc.radiansToDegrees(angle));

    }

    onButtonClicked() {
        director.loadScene("game");
    }

    update(deltaTime: number) {

    }

    onPlayEffect(event: Event) {
        let nodeButton = event.currentTarget as Node;

        let mat = this.material.find(item => item.name.includes(nodeButton.name));

        this.sprite.color = new Color(255, 255, 255, 255);
        this.sprite.material = mat;

        let that = this;

        tween({ r: 255 })
            .to(1, { r: 0 }, {
                onUpdate(target: { r: number; }, ratio) {
                    that.sprite.color = new Color(target.r, 255, 255, 255);
                }, easing: 'quadInOut'
            })
            .start();

    }

    generateSequence = function* () {
        yield 1;
        yield 2;
        yield 3;
    };

    sequence = this.generateSequence();
}


