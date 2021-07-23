import { Component, h, Host, Listen } from "@stencil/core";
import { RangeSlider } from "../range-slider/range-slider";

const emptyString = "";

@Component({
	tag: "app-root",
	styleUrl: "app-root.css",
	shadow: false
})
export class AppRoot {
	mainImage: HTMLImageElement;
	filterSliders: HTMLRangeSliderElement[] = [<range-slider ref={(element: HTMLRangeSliderElement) => (this.filterSliders[0] = element)} name="sld-brightness" text="Brightness" min={0} max={200} unit="%" data-filter-function="brightness"></range-slider>, <range-slider ref={(element: HTMLRangeSliderElement) => (this.filterSliders[1] = element)} name="sld-contrast" text="Contrast" min={0} max={200} unit="%" data-filter-function="contrast"></range-slider>, <range-slider ref={(element: HTMLRangeSliderElement) => (this.filterSliders[2] = element)} name="sld-saturation" text="Saturation" min={0} max={200} unit="%" data-filter-function="saturate"></range-slider>, <range-slider ref={(element: HTMLRangeSliderElement) => (this.filterSliders[3] = element)} name="sld-drop-shadow" text="Drop Shadow" min={0} max={50} default={0} unit="px" data-filter-function="drop-shadow"></range-slider>, <range-slider ref={(element: HTMLRangeSliderElement) => (this.filterSliders[4] = element)} name="sld-greyscale" text="Greyscale" min={0} max={100} default={0} unit="%" data-filter-function="grayscale"></range-slider>, <range-slider ref={(element: HTMLRangeSliderElement) => (this.filterSliders[5] = element)} name="sld-sepia" text="Sepia" min={0} max={100} default={0} unit="%" data-filter-function="sepia"></range-slider>, <range-slider ref={(element: HTMLRangeSliderElement) => (this.filterSliders[6] = element)} name="sld-inversion" text="Inversion" min={0} max={100} default={0} unit="%" data-filter-function="invert"></range-slider>, <range-slider ref={(element: HTMLRangeSliderElement) => (this.filterSliders[7] = element)} name="sld-opacity" text="Opacity" min={0} max={100} default={100} unit="%" data-filter-function="opacity"></range-slider>, <range-slider ref={(element: HTMLRangeSliderElement) => (this.filterSliders[8] = element)} name="sld-hue-rotation" text="Hue Rotation" min={0} max={360} default={0} unit="deg" data-filter-function="hue-rotate"></range-slider>, <range-slider ref={(element: HTMLRangeSliderElement) => (this.filterSliders[9] = element)} name="sld-blurriness" text="Blurriness" min={0} max={50} default={0} unit="px" data-filter-function="blur"></range-slider>];
	defaultFilters: Object = {};
	currentFilters: Object = {};
	outputTextarea: HTMLTextAreaElement;

	getFilter(element: HTMLRangeSliderElement) {
		const filterFunction = element.dataset.filterFunction;
		const filterValue = element.value;
		return {
			[filterFunction]: filterFunction === "drop-shadow" ? `0 0 ${filterValue} #000000` : filterValue
		};
	}

	isActive = ([key, value]) => {
		let defaultValue = this.defaultFilters[key];
		return defaultValue && defaultValue !== value;
	};

	buildFilterString = (accumulator: any, [key, value]: any) => {
		return `${accumulator} ${key}(${value})`;
	};

	@Listen("update", { passive: true })
	updateFilters(event: CustomEvent<RangeSlider>) {
		let output = emptyString;
		Object.assign(this.currentFilters, this.getFilter(event.target as HTMLRangeSliderElement));
		output = Object.entries(this.currentFilters).filter(this.isActive).reduce(this.buildFilterString, emptyString).trim();
		this.mainImage.style.filter = output;
		this.outputTextarea.textContent = output !== emptyString ? `filter: ${output};` : output;
	}

	removeFilters() {
		this.filterSliders.forEach(x => x.reset());
	}

	resetAll = () => {
		this.filterSliders.forEach(x => x.reset());
		this.removeFilters();
	};

	componentDidLoad() {
		this.defaultFilters = Object.assign({}, ...this.filterSliders.map(this.getFilter));
	}

	render() {
		return (
			<Host>
				<header>
					<h1>CSS Filters</h1>
				</header>
				<main>
					<article class="grid-container">
						<section class="main-column">
							<img ref={element => (this.mainImage = element)} class="img-fit" src="/assets/images/scenery.jpg"/>
							<div class="output-holder">
								<h3 class="highlighted">CSS:</h3>
								<textarea ref={element => (this.outputTextarea = element)} class="txt-output" rows={4} readonly={true}></textarea>
							</div>
							<button class="btn-reset" onClick={this.resetAll}>Reset Image</button>
						</section>
						<section class="right-column">{this.filterSliders}</section>
					</article>
				</main>
			</Host>
		);
	}
}