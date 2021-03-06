/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
import { HTMLStencilElement, JSXBase } from "@stencil/core/internal";
export namespace Components {
	interface AppRoot {}
	interface RangeSlider {
		default: number;
		max: number;
		min: number;
		name: string;
		reset: () => Promise<void>;
		text: string;
		unit: string;
		value: string;
	}
}
declare global {
	interface HTMLAppRootElement extends Components.AppRoot, HTMLStencilElement {}
	var HTMLAppRootElement: {
		prototype: HTMLAppRootElement;
		new (): HTMLAppRootElement;
	};
	interface HTMLRangeSliderElement extends Components.RangeSlider, HTMLStencilElement {}
	var HTMLRangeSliderElement: {
		prototype: HTMLRangeSliderElement;
		new (): HTMLRangeSliderElement;
	};
	interface HTMLElementTagNameMap {
		"app-root": HTMLAppRootElement;
		"range-slider": HTMLRangeSliderElement;
	}
}
declare namespace LocalJSX {
	interface AppRoot {}
	interface RangeSlider {
		default?: number;
		max?: number;
		min?: number;
		name?: string;
		onUpdate?: (event: CustomEvent<any>) => void;
		text?: string;
		unit?: string;
		value?: string;
	}
	interface IntrinsicElements {
		"app-root": AppRoot;
		"range-slider": RangeSlider;
	}
}
export { LocalJSX as JSX };
declare module "@stencil/core" {
	export namespace JSX {
		interface IntrinsicElements {
			"app-root": LocalJSX.AppRoot & JSXBase.HTMLAttributes<HTMLAppRootElement>;
			"range-slider": LocalJSX.RangeSlider & JSXBase.HTMLAttributes<HTMLRangeSliderElement>;
		}
	}
}