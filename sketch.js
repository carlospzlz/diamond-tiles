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
let columns = 2;
let rows = 2;

function setup()
{
    // Tiles size
    n_tiles_slider = createSlider(11, 41, n_tiles, 2);
    n_tiles_slider.input(on_n_tiles_changed);
    n_tiles_slider.parent('tile-size-param');

    // Create Repetition Parameters
    let rows_slider = createSlider(0, 10, rows);
    rows_slider.input(on_rows_changed);
    rows_slider.parent('rows-param');

    let columns_slider = createSlider(0, 10, columns);
    columns_slider.input(on_columns_changed);
    columns_slider.parent('columns-param');

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

function on_columns_changed()
{
    columns = this.value();
    update_canvas();
}

function on_rows_changed()
{
    rows = this.value();
    update_canvas();
}

function update_canvas()
{
    const width = Math.round(WIDTH / columns);
    const height = Math.round(HEIGHT / rows);

    tiles = create_tiles(width, height);

    for (let i = 0; i < columns; ++i)
    {
        for (let j = 0; j < rows; ++j)
        {
            image(tiles, i * width, j * height, width, height);
        }
    }
}

function create_tiles(width, height)
{
    tiles = createGraphics(width, height);

    const tile_width = width / n_tiles;
    const tile_height = height / (n_tiles - 1);

    // Upper half
    for (let i = 0; i < n_tiles / 2; ++i)
    {
        const y = i * tile_height;
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
            const x = j * tile_width;
            tiles.rect(x, y, tile_width, tile_height);
        }
        tiles.fill(COLORS['red']);
        let x = i * tile_width;
        tiles.rect(x, y, tile_width, tile_height);
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
            const x = j * tile_width;
            tiles.rect(x, y, tile_width, tile_height);
        }
        tiles.fill(COLORS['red']);
        x = (n_tiles - i - 1) * tile_width;
        tiles.rect(x, y, tile_width, tile_height);
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
            const x = j * tile_width;
            tiles.rect(x, y, tile_width, tile_height);
        }
    }

    // Lower half
    for (let i = 0; i < n_tiles / 2 - 1; ++i)
    {
        const half_tiles = int(n_tiles / 2);
        const y = (half_tiles + i) * tile_height;
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
            const x = j * tile_width;
            tiles.rect(x, y, tile_width, tile_height);
        }
        tiles.fill(COLORS['red']);
        let x = (half_tiles - i) * tile_width;
        tiles.fill(COLORS['red']);
        tiles.rect(x, y, tile_width, tile_height);
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
            const x = j * tile_width;
            tiles.rect(x, y, tile_width, tile_height);
        }
        tiles.fill(COLORS['red']);
        x = (half_tiles + i) * tile_width;
        tiles.rect(x, y, tile_width, tile_height);
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
            const x = j * tile_width;
            tiles.rect(x, y, tile_width, tile_height);
        }
    }

    return tiles;
}

function draw()
{
    // Empty
}
