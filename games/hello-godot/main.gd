extends Node2D

## A bouncing square: just enough to prove the CI export works.

const SIZE := 24.0

var pos := Vector2(100, 100)
var vel := Vector2(140, 100)


func _process(delta: float) -> void:
	var view := get_viewport_rect().size
	pos += vel * delta
	if pos.x < 0 or pos.x + SIZE > view.x:
		vel.x = -vel.x
		pos.x = clampf(pos.x, 0, view.x - SIZE)
	if pos.y < 0 or pos.y + SIZE > view.y:
		vel.y = -vel.y
		pos.y = clampf(pos.y, 0, view.y - SIZE)
	queue_redraw()


func _draw() -> void:
	draw_rect(get_viewport_rect(), Color("1b1d27"))
	draw_rect(Rect2(pos, Vector2(SIZE, SIZE)), Color("5ce1e6"))
	draw_string(ThemeDB.fallback_font, Vector2(12, 24), "Hello from CI!")
