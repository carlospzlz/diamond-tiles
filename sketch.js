const WIDTH = 400;
const HEIGHT = 564;

const COLORS = {
    'red': [255, 0, 0],
    'green': [0, 255, 0],
    'blue' : [0, 0, 255],
    'white': [255, 255, 255],
    'black': [0, 0, 0],
};

const DIMENSIONS = {
    'a1': [7016, 9933],
    'a2': [4690, 7016],
    'a3': [3508, 4690],
    'a4': [2480, 3508],
    'a5': [1748, 2480],
}

// Tiles
let n_tiles = 11;
let main_color = COLORS['red'];
let second_color = COLORS['blue'];
let background_color = COLORS['white'];
let outline = true;

// Repetition
let columns = 2;
let rows = 2;

function setup()
{
    // Tiles
    n_tiles_slider = createSlider(11, 41, n_tiles, 2);
    n_tiles_slider.input(on_n_tiles_changed);
    n_tiles_slider.parent('n-tiles-param');

    let main_color_picker = createColorPicker(color(main_color));
    main_color_picker.input(on_main_color_changed);
    main_color_picker.parent('main-color-param');

    let second_color_picker = createColorPicker(color(second_color));
    second_color_picker.input(on_second_color_changed);
    second_color_picker.parent('second-color-param');

    let background_color_picker = createColorPicker(color(background_color));
    background_color_picker.input(on_background_color_changed);
    background_color_picker.parent('background-color-param');

    let outline_checkbox = createCheckbox('Outline', outline);
    outline_checkbox.changed(on_outline_changed);
    outline_checkbox.parent('outline-param');

    // Create Repetition Parameters
    let rows_slider = createSlider(0, 10, rows);
    rows_slider.input(on_rows_changed);
    rows_slider.parent('rows-param');

    let columns_slider = createSlider(0, 10, columns);
    columns_slider.input(on_columns_changed);
    columns_slider.parent('columns-param');

    // Create Download
    let dina1_button = createButton('Din A1');
    dina1_button.parent('download-dinA1');
    dina1_button.mousePressed(on_download_dina1);

    let dina2_button = createButton('Din A2');
    dina2_button.parent('download-dinA2');
    dina2_button.mousePressed(on_download_dina2);

    let dina3_button = createButton('Din A3');
    dina3_button.parent('download-dinA3');
    dina3_button.mousePressed(on_download_dina3);

    let dina4_button = createButton('Din A4');
    dina4_button.parent('download-dinA4');
    dina4_button.mousePressed(on_download_dina4);

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

function on_main_color_changed()
{
    main_color = this.color();
    update_canvas();
}

function on_second_color_changed()
{
    second_color = this.color();
    update_canvas();
}

function on_background_color_changed()
{
    background_color = this.color();
    update_canvas();
}

function on_outline_changed()
{
    outline = this.checked();
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

function on_download_dina1()
{
    download_image('a1', 'diamond-tiles-dinA1.png');
}

function on_download_dina2()
{
    download_image('a2', 'diamond-tiles-dinA2.png');
}

function on_download_dina3()
{
    download_image('a3', 'diamond-tiles-dinA3.png');
}

function on_download_dina4()
{
    download_image('a4', 'diamond-tiles-dinA4.png');
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

    tiles.background(background_color);
    if (!outline)
    {
        tiles.noStroke();
    }

    // Upper half
    for (let i = 0; i < n_tiles / 2; ++i)
    {
        const y = i * tile_height;
        for (let j = 0; j < i; ++j)
        {

            if ((j - i) % 3 == 0)
            {
                tiles.fill(second_color);
            }
            else
            {
                tiles.fill(background_color);
            }
            const x = j * tile_width;
            tiles.rect(x, y, tile_width, tile_height);
        }
        tiles.fill(main_color);
        let x = i * tile_width;
        tiles.rect(x, y, tile_width, tile_height);
        for (let j = i + 1; j < n_tiles - i - 1; ++j)
        {
            if ((i + j) % 2 == 0)
            {
                tiles.fill(second_color);
            }
            else
            {
                tiles.fill(background_color);
            }
            const x = j * tile_width;
            tiles.rect(x, y, tile_width, tile_height);
        }
        tiles.fill(main_color);
        x = (n_tiles - i - 1) * tile_width;
        tiles.rect(x, y, tile_width, tile_height);
        for (let j = n_tiles - i; j < n_tiles; ++j)
        {
            if ((j - (n_tiles - i)) % 3 == 2)
            {
                tiles.fill(second_color);
            }
            else
            {
                tiles.fill(background_color);
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
                tiles.fill(second_color);
            }
            else
            {
                tiles.fill(background_color);
            }
            const x = j * tile_width;
            tiles.rect(x, y, tile_width, tile_height);
        }
        tiles.fill(main_color);
        let x = (half_tiles - i) * tile_width;
        tiles.rect(x, y, tile_width, tile_height);
        for (let j = half_tiles - i + 1; j < half_tiles + i; ++j)
        {
            if ((half_tiles + i + j) % 2 == 0)
            {
                tiles.fill(second_color);
            }
            else
            {
                tiles.fill(background_color);
            }
            const x = j * tile_width;
            tiles.rect(x, y, tile_width, tile_height);
        }
        tiles.fill(main_color);
        x = (half_tiles + i) * tile_width;
        tiles.rect(x, y, tile_width, tile_height);
        for (let j = half_tiles + i + 1; j < n_tiles; ++j)
        {
            if ((j - half_tiles - i) % 3 == 0)
            {
                tiles.fill(second_color);
            }
            else
            {
                tiles.fill(background_color);
            }
            const x = j * tile_width;
            tiles.rect(x, y, tile_width, tile_height);
        }
    }

    return tiles;
}

function download_image(format, filename)
{
    img = createGraphics(DIMENSIONS[format][0], DIMENSIONS[format][1]);

    const width = int(Math.round(img.width / columns));
    const height = int(Math.round(img.height / rows));

    img.background(255, 255, 255);

    let tiles = create_tiles(width, height);

    for (let i = 0; i < columns; ++i)
    {
        for (let j = 0; j < rows; ++j)
        {
            const dx = int(i * width);
            const dy = int(j * height);
            img.copy(tiles, 0, 0, width, height, dx, dy, width, height);
        }
    }

    save(img, filename);
}
