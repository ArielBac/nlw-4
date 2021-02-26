import { Request, Response } from "express";
import { SurveysUsersRepository } from "../repositories/SurveysUsersRepository";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";

class AnswerController {

    // http://localhost:3333/answers/1?u=d7df21cd-bea4-4207-bac3-62db1f0cca3b
    // Route Params => Parametros que compõe a rota 
    // routes.get(*/answers/:value/:nota") (identifica com os ":")

    // Query Params => Busca, Paginação, não obrigatórios
    // ? (identifica depois do "?")
    // chave=valor

    async execute(request: Request, response: Response) {
        const { value } = request.params;
        const { u } = request.query;

        const surveysUsersRepository = getCustomRepository(SurveysUsersRepository);

        const surveyUser = await surveysUsersRepository.findOne({
            id: String(u)
        });

        if(!surveyUser) {
            throw new AppError("Survey User not exists!");
        }

        surveyUser.value = Number(value);

        await surveysUsersRepository.save(surveyUser);

        return response.json(surveyUser);
    }

}

export { AnswerController };
