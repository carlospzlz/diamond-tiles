//const CLOUDFRONT_URL = 'https://kaleidoscopetoolbox.com'
//const CLOUDFRONT_URL = 'http://localhost:8000'
const CLOUDFRONT_URL = 'https://server.kaleidoscopetoolbox.com'
const SERVER_URL = 'https://server.kaleidoscopetoolbox.com'

const COLORS = {
    'red': [255, 0, 0],
    'green': [0, 255, 0],
    'blue': [0, 0, 255],
    'white': [255, 255, 255],
    'black': [0, 0, 0],
    'main': [220, 150, 150],
    'second': [150, 150, 220],
};

const DIMENSIONS = {
    'a1': [7016, 9933],
    'a2': [4690, 7016],
    'a3': [3508, 4690],
    'a4': [2480, 3508],
    'a5': [1748, 2480],
}

let canvas;
let canvas_height = window.innerHeight - 100 - 63;
let canvas_width = Math.round(canvas_height / 1.41);

// Tiles
let n_tiles = 11;
let main_color = COLORS['main'];
let second_color = COLORS['second'];
let background_color = COLORS['white'];
let outline = true;

// Repetition
let columns = 2;
let rows = 2;

// Widgets
// Tiles
let n_tiles_slider;
let main_color_picker;
let second_color_picker;
let background_color_picker;
let outline_checkbox;

// Repetition
let rows_slider;
let columns_slider;

// Kaleidoscope Toolbox signature
let signature;

function get_query_variable(variable)
{
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (let i = 0; i < vars.length; ++i)
    {
        const pair = vars[i].split("=");
        if (pair[0] == variable)
        {
            return pair[1];
        }
    }
    return false;
}

function preload()
{
    signature = loadImage("resources/signature.png");
}

function setup()
{
    // Create Tiles Parameters
    const tiles_box = createDiv();
    tiles_box.parent('parameters-container');
    tiles_box.addClass('box');
    tiles_box_title = createElement('h1', 'TILES');
    tiles_box_title.parent(tiles_box);

    n_tiles_label = createP('Number of Tiles');
    n_tiles_label.parent(tiles_box);
    n_tiles_slider = createSlider(11, 41, n_tiles, 2);
    n_tiles_slider.input(on_n_tiles_changed);
    n_tiles_slider.parent(tiles_box);

    n_colors_label = createP('Color of Tiles');
    n_colors_label.parent(tiles_box);

    tiles_color_group = createDiv();
    tiles_color_group.parent(tiles_box);
    tiles_color_group.addClass('group');

    main_color_picker = createColorPicker(color(main_color));
    main_color_picker.input(on_main_color_changed);
    main_color_picker.parent(tiles_color_group);

    second_color_picker = createColorPicker(color(second_color));
    second_color_picker.input(on_second_color_changed);
    second_color_picker.parent(tiles_color_group);

    background_color_picker = createColorPicker(color(background_color));
    background_color_picker.input(on_background_color_changed);
    background_color_picker.parent(tiles_color_group);

    outline_checkbox = createCheckbox('', outline);
    outline_checkbox.changed(on_outline_changed);
    outline_checkbox.parent(tiles_color_group);
    outline_label = createP('Outline');
    outline_label.parent(tiles_color_group);

    // Create Repetition Parameters
    const repetition_box = createDiv();
    repetition_box.parent('parameters-container');
    repetition_box.addClass('box');
    repetition_box_title = createElement('h1', 'REPETITION');
    repetition_box_title.parent(repetition_box);

    rows_label = createP('Number of Rows');
    rows_label.parent(repetition_box);
    rows_slider = createSlider(0, 10, rows);
    rows_slider.input(on_rows_changed);
    rows_slider.parent(repetition_box);

    columns_label = createP('Number of Columns');
    columns_label.parent(repetition_box);
    columns_slider = createSlider(0, 10, columns);
    columns_slider.input(on_columns_changed);
    columns_slider.parent(repetition_box);

    // Create Canvas
    canvas = create_canvas(canvas_width, canvas_height);

    // Load parameters from template and update canvas.
    load_parameters();
}

function create_canvas(width, height)
{
    canvas = createCanvas(canvas_width, canvas_height);
    canvas.style("background", "#FFFFFF");
    canvas.style("border-radius", "50px");
    canvas.style("box-shadow", "0px 4px 30px rgba(0, 0, 0, 0.02)");
    canvas.parent("canvas-element");
}

function load_parameters()
{
    const value = get_query_variable("template");
    if (!value)
    {
        update_canvas();
        return;
    }

    const url =
        CLOUDFRONT_URL + '/tools/diamond-tiles/templates/json/' + value +
        '.json';

    fetch(url)
        .then(function(resp)
        {
            return resp.json();
        })
        .then(function(data)
        {
            on_parameters_received(data);
        });
}

function on_parameters_received(data)
{
    background_color = data['background_color'];
    columns = data['columns'];
    main_color = data['main_color'];
    n_tiles = data['n_tiles'];
    outline = data['outline'];
    rows = data['rows'];
    second_color = data['second_color'];

    // Update UI
    // Tiles
    n_tiles_slider.value(n_tiles);
    main_color_picker.value(color(main_color).toString('#rrggbb'));
    second_color_picker.value(color(second_color).toString('#rrggbb'));
    background_color_picker.value(color(background_color).toString('#rrggbb'));
    outline_checkbox.checked(outline);
    // Repetition
    rows_slider.value(rows);
    columns_slider.value(columns);

    update_canvas();
}

function on_n_tiles_changed()
{
    n_tiles = this.value();
    update_canvas();
}

function on_main_color_changed()
{
    main_color = this.value();
    update_canvas();
}

function on_second_color_changed()
{
    second_color = this.value();
    update_canvas();
}

function on_background_color_changed()
{
    background_color = this.value();
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
    upload_params('diamond-tiles', 'dinA1');
    download_image('a1', 'diamond-tiles-dinA1.png');
}

function on_download_dina2()
{
    upload_params('diamond-tiles', 'dinA2');
    download_image('a2', 'diamond-tiles-dinA2.png');
}

function on_download_dina3()
{
    upload_params('diamond-tiles', 'dinA3');
    download_image('a3', 'diamond-tiles-dinA3.png');
}

function on_download_dina4()
{
    upload_params('diamond-tiles', 'dinA4');
    download_image('a4', 'diamond-tiles-dinA4.png');
}

function update_canvas()
{
    const img = create_image(canvas_width, canvas_height);
    image(img, 0, 0, canvas_width, canvas_height);
}

function create_image(img_width, img_height)
{
    img = createGraphics(img_width, img_height);

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

    img.blend(
        signature, 0, 0, signature.width, signature.height,
        int(2 / 3 * img_width), int(11 / 12 * img_height), int(img_width / 4),
        int(img_height / 16), DARKEST);

    return img;
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
    img = create_image(DIMENSIONS[format][0], DIMENSIONS[format][1]);
    save(img, filename)
    gtag('event', 'design_download',
    {
        'event_category': 'engagement'
    });
}

function windowResized()
{
    canvas_height = window.innerHeight - 100 - 63;
    canvas_width = Math.round(canvas_height / 1.41);
    canvas = create_canvas(canvas_width, canvas_height);
    update_canvas();
}

function upload_params(tool, size)
{
    const url = SERVER_URL + '/cgi-bin/upload-params';
    const params_data = {
        'tool': tool,
        'size': size,
        'n_tiles': n_tiles,
        'main_color': main_color,
        'second_color': second_color,
        'background_color': background_color,
        'outline': outline,
        'columns': columns,
        'rows': rows,
    };
    const options = {
        method: 'POST',
        headers:
        {
            'Content-Type': 'application/json'
        },
        mode: 'no-cors',
        body: JSON.stringify(params_data)
    };
    fetch(url, options);
}
