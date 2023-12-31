 "use client"

import { useRouter, useSearchParams } from "next/navigation"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"

const filters = [
  {
    id: "Categorie",
    name: "Categorie",
    options: [
      { value: "t-shirt", label: "t-shirt" },
      { value: "t-shirt2", label: "t-shirt2" },
      { value: "lunette", label: "lunette" },
      { value: "t-shirt3", label: "t-shirt3" },
      { value: "t-shirt4", label: "t-shirt4" },
    ],
  },
  {
    id: "taille",
    name: "Taille",
    options: [
      { value: "xs", label: "X-Small" },
      { value: "s", label: "Small" },
      { value: "m", label: "Medium" },
      { value: "l", label: "Large" },
      { value: "xl", label: "X-Large" },
     
    ],
  },
  {
    id: "color",
    name: "Couleur",
    options: [
      { value: "noir", label: "Noir" },
      { value: "bleu", label: "Bleu" },
      { value: "vert", label: "Vert" },
      { value: "jaune", label: "Jaune" },
    ],
  },
]

export function ProductFilters() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const searchValues = Array.from(searchParams.entries())
  return (
    <form className="sticky top-20">
      <h3 className="sr-only">Categories</h3>

      {filters.map((section, i) => (
        <Accordion key={i} type="single" collapsible>
          <AccordionItem value={`item-${i}`}>
            <AccordionTrigger>
              <span>
                {section.name}{" "}
                <span className="ml-1 text-xs font-extrabold uppercase text-gray-400"></span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                {section.options.map((option, optionIdx) => (
                  <div
                    key={option.value}
                    className="flex items-center space-x-2"
                  >
                    <Checkbox id={`filter-${section.id}-${optionIdx}`} 
                      checked={searchValues.some(([key, value]) => key === section.id && value === option.value)}
                      onClick={(event) => {
                      const params = new URLSearchParams(searchParams)
                      const checked = event.currentTarget.dataset.state === "checked"
                      checked ? params.delete(section.id) : params.set(section.id, option.value)
                      router.replace(`/?${params.toString()}`)
                    }}/>
                    <label htmlFor="" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </form>
  )
}
