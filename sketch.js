const WIDTH = 400;
const HEIGHT = 564;

const COLORS = {
    'red': [255, 0, 0],
    'green': [0, 255, 0],
    'blue' : [0, 0, 255],
    'white': [255, 255, 255],
    'black': [0, 0, 0],
};

let n_tiles = 11;
let square_size = 10;

function setup()
{
    n_tiles_slider = createSlider(11, 41, n_tiles, 2);
    n_tiles_slider.input(on_n_tiles_changed);
    n_tiles_slider.parent('tile-size-param');

    // Create Canvas
    let canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent("canvas-container");

    update_canvas();
}

function on_n_tiles_changed()
{
    n_tiles = this.value();
    update_canvas();
}

function update_canvas()
{
    tiles = createGraphics(WIDTH, HEIGHT);

    const tile_size = WIDTH / n_tiles;

    /*
    for (let i = 0; i < n_tiles; ++i)
    {
        for (let j = 0; j < n_tiles; ++j)
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

    /*
    const offset = n_tiles % 3;
    for (let i = 0; i < n_tiles; ++i)
    {
        for (let j = 0; j < n_tiles; ++j)
        {
            if (i == j || i == (n_tiles - j - 1))
            {
                tiles.fill(COLORS['red']);
            }
            else if (j > i && j < (n_tiles - i))
            {
                const j_rel = j - i;
                if (j_rel % 2 == 1)
                {
                    tiles.fill(COLORS['white']);
                }
                else
                {
                    tiles.fill(COLORS['blue']);
                }
            }
            else if (j > (n_tiles - i - 1) && j < i)
            {
                const j_rel = j - (n_tiles - i - 1);
                if (j_rel % 2 == 1)
                {
                    tiles.fill(COLORS['white']);
                }
                else
                {
                    tiles.fill(COLORS['blue']);
                }
            }
            else if (i > 2 && i < n_tiles - 2 - 1)
            {
                if (i < n_tiles / 2)
                {
                    if (j < n_tiles / 2)
                    {
                        if ((i - j + 1) % 3 == 1)
                        {
                            tiles.fill(COLORS['blue']);
                        }
                        else
                        {
                            tiles.fill(COLORS['white']);
                        }
                    }
                    else
                    {
                        if ((i + j + offset) % 3 == 1)
                        {
                            tiles.fill(COLORS['blue']);
                        }
                        else
                        {
                            tiles.fill(COLORS['white']);
                        }
                    }
                }
                else
                {
                    if ((j - i + 1) % 4 < 2)
                    {
                        tiles.fill(COLORS['blue']);
                    }
                    else
                    {
                        tiles.fill(COLORS['white']);
                    }
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
    */
    // Upper half
    for (let i = 0; i < n_tiles / 2; ++i)
    {
        const y = i * tile_size;
        for (let j = 0; j < i; ++j)
        {

            if ((j - i) % 3 == 0)
            {
                tiles.fill(COLORS['blue']);
            }
            else
            {
                tiles.fill(COLORS['white']);
            }
            const x = j * tile_size;
            tiles.rect(x, y, tile_size, tile_size);
        }
        tiles.fill(COLORS['red']);
        tiles.rect(y, y, tile_size, tile_size);
        for (let j = i + 1; j < n_tiles - i - 1; ++j)
        {
            if ((i + j) % 2 == 0)
            {
                tiles.fill(COLORS['blue']);
            }
            else
            {
                tiles.fill(COLORS['white']);
            }
            const x = j * tile_size;
            tiles.rect(x, y, tile_size, tile_size);
        }
        tiles.fill(COLORS['red']);
        const x = (n_tiles - i - 1) * tile_size;
        tiles.rect(x, y, tile_size, tile_size);
        for (let j = n_tiles - i; j < n_tiles; ++j)
        {
            if ((j - (n_tiles - i)) % 3 == 2)
            {
                tiles.fill(COLORS['blue']);
            }
            else
            {
                tiles.fill(COLORS['white']);
            }
            const x = j * tile_size;
            tiles.rect(x, y, tile_size, tile_size);
        }
    }

    // Lower half
    for (let i = 0; i < n_tiles / 2; ++i)
    {
        const half_tiles = int(n_tiles / 2);
        const y = (half_tiles + i) * tile_size;
        for (let j = 0; j < n_tiles / 2 - i; ++j)
        {
            if ((n_tiles + i + j - 1) % 3 == 0)
            {
                tiles.fill(COLORS['blue']);
            }
            else
            {
                tiles.fill(COLORS['white']);
            }
            const x = j * tile_size;
            tiles.rect(x, y, tile_size, tile_size);
        }
        tiles.fill(COLORS['red']);
        let x = (half_tiles - i) * tile_size;
        tiles.fill(COLORS['red']);
        tiles.rect(x, y, tile_size, tile_size);
        for (let j = half_tiles - i + 1; j < half_tiles + i; ++j)
        {
            if ((half_tiles + i + j) % 2 == 0)
            {
                tiles.fill(COLORS['blue']);
            }
            else
            {
                tiles.fill(COLORS['white']);
            }
            const x = j * tile_size;
            tiles.rect(x, y, tile_size, tile_size);
        }
        tiles.fill(COLORS['red']);
        x = (half_tiles + i) * tile_size;
        tiles.rect(x, y, tile_size, tile_size);
        for (let j = half_tiles + i + 1; j < n_tiles; ++j)
        {
            if ((j - half_tiles - i) % 3 == 0)
            {
                tiles.fill(COLORS['blue']);
            }
            else
            {
                tiles.fill(COLORS['white']);
            }
            const x = j * tile_size;
            tiles.rect(x, y, tile_size, tile_size);
        }
    }

    image(tiles, 0, 0, WIDTH, HEIGHT);
}

function draw()
{
    // Empty
}
