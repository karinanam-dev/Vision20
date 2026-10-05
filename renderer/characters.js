// Six distinct cute characters. Each has a name, a dance style (CSS class),
// a color theme, and an SVG-ish HTML body built from divs so no image files
// are needed. The break window picks one at random each time.

const CHARACTERS = [
  {
    name: 'Sunny',
    dance: 'dance-bounce',
    // Round yellow blob with rosy cheeks.
    build: () => `
      <div class="char-body" style="background: linear-gradient(160deg,#ffe08a,#ffb84d); border-radius:50% 50% 46% 46%;">
        <div class="eye" style="left:30px"></div>
        <div class="eye" style="right:30px"></div>
        <div class="cheek" style="left:20px"></div>
        <div class="cheek" style="right:20px"></div>
        <div class="smile"></div>
      </div>`,
  },
  {
    name: 'Minty',
    dance: 'dance-wiggle',
    // Tall mint-green creature with little antennae.
    build: () => `
      <div class="char-body" style="background: linear-gradient(160deg,#9ff0cf,#4fd8a8); border-radius:48% 48% 40% 40%; height:120px;">
        <div class="antenna" style="left:34px"></div>
        <div class="antenna" style="right:34px"></div>
        <div class="eye" style="left:28px; top:46px"></div>
        <div class="eye" style="right:28px; top:46px"></div>
        <div class="smile" style="top:74px"></div>
      </div>`,
  },
  {
    name: 'Blu',
    dance: 'dance-spin',
    // Blue round buddy with big sparkly eyes.
    build: () => `
      <div class="char-body" style="background: linear-gradient(160deg,#a7c8ff,#5b8def); border-radius:50%;">
        <div class="eye big" style="left:26px"></div>
        <div class="eye big" style="right:26px"></div>
        <div class="cheek" style="left:18px"></div>
        <div class="cheek" style="right:18px"></div>
        <div class="smile"></div>
      </div>`,
  },
  {
    name: 'Rosie',
    dance: 'dance-hop',
    // Pink petal-shaped sweetie with a leaf.
    build: () => `
      <div class="char-body" style="background: linear-gradient(160deg,#ffc2e0,#ff85b8); border-radius:50% 50% 50% 50% / 60% 60% 40% 40%;">
        <div class="leaf"></div>
        <div class="eye" style="left:30px"></div>
        <div class="eye" style="right:30px"></div>
        <div class="cheek" style="left:20px"></div>
        <div class="cheek" style="right:20px"></div>
        <div class="smile"></div>
      </div>`,
  },
  {
    name: 'Coco',
    dance: 'dance-sway',
    // Warm brown bear-ish friend with round ears.
    build: () => `
      <div class="char-body" style="background: linear-gradient(160deg,#d9a97a,#b67a44); border-radius:46%;">
        <div class="ear" style="left:6px"></div>
        <div class="ear" style="right:6px"></div>
        <div class="eye" style="left:30px"></div>
        <div class="eye" style="right:30px"></div>
        <div class="snout"></div>
        <div class="smile" style="top:76px"></div>
      </div>`,
  },
  {
    name: 'Grape',
    dance: 'dance-shake',
    // Purple squishy pal with a tuft on top.
    build: () => `
      <div class="char-body" style="background: linear-gradient(160deg,#d6b3ff,#9d6be0); border-radius:50% 50% 44% 44%;">
        <div class="tuft"></div>
        <div class="eye" style="left:30px"></div>
        <div class="eye" style="right:30px"></div>
        <div class="cheek" style="left:20px"></div>
        <div class="cheek" style="right:20px"></div>
        <div class="smile"></div>
      </div>`,
  },
];

function pickRandomCharacter() {
  const i = Math.floor(Math.random() * CHARACTERS.length);
  return CHARACTERS[i];
}
