import { Post } from "@wordpress/core-data";
import { BlockAttributeValues as ListItemTypes } from "../components/list-item/list-item";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type TypeMapping = {
	boolean: boolean;
	string: string;
	number: number;
	array: any[];
	object: Record<string, any>;
};

export type ConvertType<T extends keyof TypeMapping> = TypeMapping[T];

export type AttributeDefinition<T extends keyof TypeMapping> = {
	type: T;
	default: ConvertType<T>;
};

type EnumAttributeDefinition<E extends readonly string[]> = {
	type: "string";
	enum: E;
	default: E[number];
};

type ExtendedAttributeDefinition<
	T extends keyof TypeMapping,
	E extends readonly string[] = never
> = E extends never ? AttributeDefinition<T> : EnumAttributeDefinition<E>;

export type GetBlockAttributeValues<
	Attr extends Record<
		string,
		ExtendedAttributeDefinition<keyof TypeMapping, any>
	>
> = {
	[K in keyof Attr]: Attr[K] extends EnumAttributeDefinition<infer E>
		? E[number]
		: ConvertType<Attr[K]["type"]>;
} & {
	className?: string;
};

export type GetSetAttributesFunction<
	Attr extends Record<string, AttributeDefinition<keyof TypeMapping>>
> = (attributes: Partial<GetBlockAttributeValues<Attr>>) => void;

export type Image = {
	url: string;
	alt: string;
	id: string;
};
export type CardType = "primary" | "secondary";
export const cardTypes: CardType[] = ["primary", "secondary"];

export type Card = Image & {
	cardEyebrow?: string;
	cardTitle: string;
	cardText: string;
	cardType: CardType;
};

export type FetchedPost = {
	label: string;
	value: number;
	post: Post;
};

export function createDefaultAttributes<
	T extends Record<string, AttributeDefinition<keyof TypeMapping>>
>(attrDefs: T): GetBlockAttributeValues<T> {
	const defaults: Partial<GetBlockAttributeValues<T>> = {};
	for (const key in attrDefs) {
		const attribute = attrDefs[key];
		defaults[key as keyof T] =
			attribute.default as GetBlockAttributeValues<T>[keyof T];
	}
	return defaults as GetBlockAttributeValues<T>;
}

export type Link = {
	text: string;
	url: string;
};

export type LinkText = {
	text: string;
	link: Link;
};

export type ListElement = {
	title: string;
	accordions: ListItemTypes[];
};
