import { Component, ComponentInterface, Event, h, Host, Method, Prop } from "@stencil/core";
import { EventEmitter } from "@stencil/router/dist/types/stencil.core";

@Component({
	tag: "range-slider",
	styleUrl: "range-slider.css",
	shadow: false
})
export class RangeSlider implements ComponentInterface {
	@Prop() name: string = "";
	@Prop() text: string = "";
	@Prop() min: number = 0;
	@Prop() max: number = 100;
	@Prop() default: number = this.max < this.min ? this.min : this.min + (this.max - this.min) / 2;
	@Prop() unit: string = "";
	@Prop({ mutable: true, reflect: false }) value: string = `${this.position}${this.unit}`;
	@Event() update: EventEmitter;
	rangeInput: HTMLInputElement;

	set position(value: number) {
		this.rangeInput.value = value.toString();
	}

	get position(): number {
		return Number.parseFloat(this.rangeInput?.value);
	}

	changeHandler(event) {
		this.position = Number.parseFloat(event.target.value);
		this.value = `${this.position}${this.unit}`;
		this.update.emit(
			Object.assign({}, event, {
				value: this.value
			})
		);
	}

	@Method()
	async reset() {
		this.position = this.default;
		this.rangeInput.dispatchEvent(new InputEvent("input"));
	}

	componentDidLoad() {
		this.reset();
	}

	render() {
		return (
			<Host>
				<div class="flex space-between">
					<label htmlFor={this.name}>{this.text}</label>
					<span>{this.value}</span>
				</div>
				<div class="flex space-between">
					<input id={this.name} ref={element => (this.rangeInput = element)} type="range" min={this.min} max={this.max} defaultValue={this.default.toString()} onInput={this.changeHandler.bind(this)}/>
					<button onClick={() => this.reset()} class="align-end">
						Reset
					</button>
				</div>
			</Host>
		);
	}
}