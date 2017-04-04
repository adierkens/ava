'use strict';
const chalk = require('chalk');
const indentString = require('indent-string');
const kathryn = require('kathryn');

function formatValue(value, options) { // eslint-disable-line no-unused-vars
	// TODO: Enable highlighting (once supported)
	// TODO: Fix maxDepth usage (once supported)
	// TODO: Format React trees
	return kathryn.format(value);
}
exports.formatValue = formatValue;

function formatDescriptorDiff(actualDescriptor, expectedDescriptor) {
	const formatted = kathryn.diffDescriptors(actualDescriptor, expectedDescriptor);
	return formatted ?
		{label: 'Difference:', formatted} :
		null;
}
exports.formatDescriptorDiff = formatDescriptorDiff;

function formatDiff(actual, expected) {
	return formatDescriptorDiff(kathryn.describe(actual), kathryn.describe(expected));
}
exports.formatDiff = formatDiff;

function formatDescriptorWithLabel(label, descriptor) {
	// TODO: Enable highlighting (once supported)
	// TODO: Format React trees
	return {label, formatted: kathryn.formatDescriptor(descriptor)};
}
exports.formatDescriptorWithLabel = formatDescriptorWithLabel;

function formatWithLabel(label, value) {
	return formatDescriptorWithLabel(label, kathryn.describe(value));
}
exports.formatWithLabel = formatWithLabel;

function formatSerializedError(error) {
	if (error.statements.length === 0 && error.values.length === 0) {
		return null;
	}

	let result = error.values
		.map(value => `${value.label}\n\n${indentString(value.formatted, 2).trimRight()}\n`)
		.join('\n');

	if (error.statements.length > 0) {
		if (error.values.length > 0) {
			result += '\n';
		}

		result += error.statements
			.map(statement => `${statement[0]}\n${chalk.grey('=>')} ${statement[1]}\n`)
			.join('\n');
	}

	return result;
}
exports.formatSerializedError = formatSerializedError;
