import { defineField, defineType } from "sanity";

export const product = defineType({
    name: "produit",
    title: "Produits",
    type: "document",
    fields: [
        defineField({
            name: "name",
            title: "name",
            type: "string"
        }),
        {
            name: "slug",
            title: "Slug",
            type: "slug",
            options: {
                source: "nom"
            }
        },
        {
            name: "images",
            title: "Images",
            type: "array",
            of: [{type: 'image'}]
        },
        {
            name: "categories",
            title: "Categories",
            type: "array",
            of: [{type: 'string'}]
        },
        {
            name: "taille",
            title: "Taille",
            type: "array",
            of: [{type: 'string'}]
        },
        {
            name: "couleur",
            title: "Couleur",
            type: "array",
            of: [{type: 'string'}]
        },
        {
            name: "description",
            title: "Description",
            type: "string",
        },
       
        {
            name: "currency",
            title: "Currency",
            type: "string",
        },
        {
            name: "price",
            title: "Prix",
            type: "number",
        },
    ]

})
