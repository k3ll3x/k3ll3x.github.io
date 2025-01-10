var ctx = null; js_objects = {}, unique_js_id = 0, register_plugin = function (a) { a.env.js_create_string = function (a, b) { var c = UTF8ToString(a, b); return js_object(c) }, a.env.js_create_buffer = function (c, d) { var a = new Uint8Array(wasm_memory.buffer, c, d), b = new Uint8Array(new ArrayBuffer(a.byteLength)); return b.set(new Uint8Array(a)), js_object(b) }, a.env.js_create_object = function () { var a = {}; return js_object(a) }, a.env.js_set_field_f32 = function (a, b, c, d) { var e = UTF8ToString(b, c); js_objects[a][e] = d }, a.env.js_unwrap_to_str = function (c, h, d) { for (var e = js_objects[c], b = toUTF8Array(e), f = b.length, g = new Uint8Array(wasm_memory.buffer, h, d), a = 0; a < f; a++)g[a] = b[a] }, a.env.js_unwrap_to_buf = function (g, d, b) { for (var c = js_objects[g], e = c.length, f = new Uint8Array(wasm_memory.buffer, d, b), a = 0; a < e; a++)f[a] = c[a]; console.log(b) }, a.env.js_string_length = function (a) { var b = js_objects[a]; return toUTF8Array(b).length }, a.env.js_buf_length = function (a) { var b = js_objects[a]; return b.length }, a.env.js_free_object = function (a) { delete js_objects[a] }, a.env.js_field = function (b, c, d) { var e = UTF8ToString(c, d), f = js_objects[b][e], a = unique_js_id; return js_objects[a] = f, unique_js_id += 1, a } }, miniquad_add_plugin({ register_plugin }); function toUTF8Array(d) { for (var b = [], c = 0, a; c < d.length; c++)a = d.charCodeAt(c), a < 128 ? b.push(a) : a < 2048 ? b.push(192 | a >> 6, 128 | a & 63) : a < 55296 || a >= 57344 ? b.push(224 | a >> 12, 128 | a >> 6 & 63, 128 | a & 63) : (c++, a = 65536 + ((a & 1023) << 10 | d.charCodeAt(c) & 1023), b.push(240 | a >> 18, 128 | a >> 12 & 63, 128 | a >> 6 & 63, 128 | a & 63)); return b } function js_object(b) { var a = unique_js_id; return js_objects[a] = b, unique_js_id += 1, a } function consume_js_object(a) { var b = js_objects[a]; return delete js_objects[a], b } function get_js_object(a) { return js_objects[a] }