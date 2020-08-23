const WIDTH = 400;
const HEIGHT = 564;

const COLORS = {
    'red': [255, 0, 0],
    'green': [0, 255, 0],
    'blue' : [0, 0, 255],
    'white': [255, 255, 255],
    'black': [0, 0, 0],
};

let h_tiles = 11;
let square_size = 10;

function setup()
{
    h_tiles_slider = createSlider(11, 41, h_tiles, 2);
    h_tiles_slider.input(on_h_tiles_changed);
    h_tiles_slider.parent('tile-size-param');

    // Create Canvas
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("canvas-container");

    update_canvas();
}

function on_h_tiles_changed()
{
    h_tiles = this.value();
    update_canvas();
}

function update_canvas()
{
    tiles = createGraphics(WIDTH, HEIGHT);

    const tile_size = WIDTH / h_tiles;
    const v_tiles = HEIGHT / tile_size;

    /*
    for (let i = 0; i < h_tiles; ++i)
    {
        for (let j = 0; j < v_tiles; ++j)
        {
            const x = i * tile_size;
            const y = j * tile_size;
            if ((i + j) % 2 == 0)
            {
                tiles.fill(COLORS['white']);
            }
            else
            {
                tiles.fill(COLORS['red']);
            }
            tiles.rect(x, y, tile_size, tile_size);
        }
    }
    */

    for (let i = 0; i < v_tiles; ++i)
    {
        for (let j = 0; j < h_tiles; ++j)
        {
            if (i == j || i == (h_tiles - j - 1))
            {
                tiles.fill(COLORS['red']);
            }
            else if (j > i && j < (h_tiles - i))
            {
                const j_rel = j - i;
                if (j_rel % 2 == 1)
                {
                    tiles.fill(COLORS['white']);
                }
                else
                {
                    tiles.fill(COLORS['red']);
                }
            }
            else if (j > (h_tiles - i) && j < i)
            {
                const j_rel = j - (h_tiles - i - 1);
                console.log(j_rel);
                if (j_rel % 2 == 1)
                {
                    tiles.fill(COLORS['white']);
                }
                else
                {
                    tiles.fill(COLORS['red']);
                }
            }
            else
            {
                tiles.fill(COLORS['white']);
            }
            const x = j * tile_size;
            const y = i * tile_size;
            tiles.rect(x, y, tile_size, tile_size);
        }
    }

    image(tiles, 0, 0, WIDTH, HEIGHT);
}

function draw()
{
    // Empty
}
