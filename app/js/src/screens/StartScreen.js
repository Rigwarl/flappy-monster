import assetsManager from '../managers/assetsManager';
import screensManager from '../managers/screensManager';
import dataManager from '../managers/dataManager';
import soundManager from '../managers/soundManager';
import IconBtn from '../display/IconBtn';
import Hero from '../display/Hero';
import Btn from '../display/Btn';

export default class StartScreen extends createjs.Container {
  constructor(width, height) {
    super();

    this.width = width;
    this.height = height;

    this.bg = new createjs.Bitmap(assetsManager.getResult('start'));
    // for better times
    // this.title = new createjs.Text('Choose your avatar', '45px CarterOne', '#000');
    // this.title.textAlign = 'center';
    // this.title.x = this.width / 2;
    // this.title.y = 100;

    this.startBtn = new Btn('Start');
    this.startBtn.x = width / 2;
    this.startBtn.y = 175 + this.height / 2 - 80;
    // this.startBtn.disable();

    this.addChild(this.bg, this.title, this.startBtn);
    // this.createHeroes();

    this.startBtn.addEventListener('click', () =>
      screensManager.change('MainScreen'));

    const hero = new Hero('monster');
    hero.x = width / 2;
    hero.y = height / 2 - 75;
    this.addChild(hero);

    const soundBtn = new IconBtn(soundManager.isEnabled() ? 'sound' : 'soundOff');
    soundBtn.x = this.width - soundBtn.getBounds().width / 2 - 25;
    soundBtn.y = soundBtn.getBounds().height / 2 + 20;
    this.addChild(soundBtn);

    soundBtn.addEventListener('click', () => {
      soundManager.toggle();
      soundBtn.changeLabel(soundManager.isEnabled() ? 'sound' : 'soundOff');
    });
  }
  createHeroes() {
    this.heroes = [
      new Hero('bird'),
      new Hero('monster'),
      new Hero('chicken'),
    ];
    this.heroes.forEach((hero, i) => {
      hero.y = this.height / 2;
      hero.x = (i + 1) * this.width / (this.heroes.length + 1);
      hero.cursor = 'pointer';
      hero.addEventListener('click', () => this.selectHero(hero));
      hero.cache(0, 0, hero.bounds.width, hero.bounds.height);
    });
    this.heroFilter = new createjs.ColorFilter(0.6, 0.6, 0.6);
    this.resetHeroes();
    this.addChild(...this.heroes);
  }
  resetHeroes() {
    this.heroes.forEach(hero => {
      hero.filters = [this.heroFilter];
      hero.updateCache();
      hero.scaleX = 0.85;
      hero.scaleY = 0.85;
    });
  }
  selectHero(hero) {
    this.resetHeroes();

    hero.filters = [];
    hero.updateCache();
    hero.scaleX = 1;
    hero.scaleY = 1;
    hero.flap();

    if (!this.startBtn.enabled) {
      this.startBtn.enable();
    }

    dataManager.heroType = hero.type;
  }
}
