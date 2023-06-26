import { createClient } from "next-sanity"

import { apiVersion, dataset, projectId, useCdn } from "../env"

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token: "skf9CboCyKsCdHF8MoncRHIC0vB4FggXkfap754xuPaDsJOnpAkVSLexpDfYIk2HGprCVeUyvMVCG2rFBMYTszYPLUoa0eCUSsnGx2WWVZxSYg18fw5zEEqYfPIOtssM9v05z4Ky1uGWLKgPazELYa2qWepd6vTMCfJVgM0d2onNzhwf3r3V",
})
