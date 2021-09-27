import { Plan } from '../models'
import { validateRequest, paginatedQueryResponse } from '../utils'

export const index = async (req, res) => {
    const { filter } = req.query

    const query = Plan.query()

    if (filter) {
        if (filter.name) {
            query.where('name', filter.name)
        }
    }

    return paginatedQueryResponse(query, req, res)
}

export const store = async (req, res) => {
    const reqErrors = await validateRequest(req, res);

    if (!reqErrors) {
        const { trivia_ids, ...plan } = req.body;

        const model = await Plan.query().insert(plan)
        await model.$relatedQuery('trivias').relate(trivia_ids)

        return res.status(201).json(model)
    }
}

export const update = async (req, res) => {
    const { id } = req.params

    const model = await Plan.query().updateAndFetchById(id, req.body)

    return res.status(201).json(model)
}

export const show = async (req, res) => {
    const { id } = req.params

    const model = await Plan.query().findById(id)

    return res.status(201).json(model)
}

export const destroy = async (req, res) => {
    let id = parseInt(req.params.id)
    const model = await Plan.query().findById(id).delete().first();

    return res.json(model);
}
