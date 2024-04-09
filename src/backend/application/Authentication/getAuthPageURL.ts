// 認証ページを返すユースケース

import { IGetAuthPageURLQueryService } from "./query_service/getAuthPageURLQueryService";

export type GetAuthPageURLUseCaseInput = {
    AuthMethod: string;
}

export type GetAuthPageURLUseCaseOutput = {
    AuthPageURL: string;
}

export class GetAuthPageURLUseCase {
    private getAuthPageURLQueryService: IGetAuthPageURLQueryService;

    constructor(getAuthPageURLQueryService: IGetAuthPageURLQueryService) {
        this.getAuthPageURLQueryService = getAuthPageURLQueryService;
    }

    async execute(input: GetAuthPageURLUseCaseInput): Promise<GetAuthPageURLUseCaseOutput> {
        const { AuthMethod } = input;
        const AuthPageURL = await this.getAuthPageURLQueryService.execute(AuthMethod);
        if (!AuthPageURL) {
            throw new Error('認証ページが見つかりませんでした');
        }
        return { AuthPageURL };
    }
}