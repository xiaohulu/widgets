import { create, tsx } from '@dojo/framework/core/vdom';
import theme from '../middleware/theme';
import { formatAriaProperties } from '../common/util';
import * as css from '../theme/default/icon.m.css';
import * as baseCss from '../common/styles/base.m.css';

export type IconType = keyof typeof css;

export interface IconProperties {
	/** An optional, visually hidden label for the icon */
	altText?: string;
	/** Custom aria attributes */
	aria?: { [key: string]: string | null };
	/** Icon type, e.g. downIcon, searchIcon, etc. */
	type: IconType;
	size?: 'small' | 'medium' | 'large';
}

const factory = create({ theme }).properties<IconProperties>();

export const Icon = factory(function Icon({ properties, middleware: { theme } }) {
	const {
		aria = {
			hidden: 'true'
		},
		type,
		altText,
		size
	} = properties();

	const classes = theme.classes(css);
	const sizeClass = size && classes[size as keyof typeof classes];

	return (
		<virtual>
			<i
				classes={[theme.variant(), classes.icon, classes[type], sizeClass]}
				{...formatAriaProperties(aria)}
			/>
			{altText ? <span classes={baseCss.visuallyHidden}>{altText}</span> : null}
		</virtual>
	);
});

export default Icon;
