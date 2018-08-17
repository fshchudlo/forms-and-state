import { I18NextService } from 'angular-i18next';

export class ValidationMessageModel {
    private static sharedValidationNamespacePrefix: string = 'shared:validation.';
    public message: string;

    constructor(i18next: I18NextService, errorKey: string, params: any, i18nextNamespace: string, controlPath?: string) {
        // Если это ошибка с сервера, то просто берем ее как есть, они уже даже локализованные
        if (errorKey === 'serverErrors') {
            this.message = params;
            return;
        }
        // Если ошибка указана в самом сообщении валидации в параметрах - набиваем ключи локализации из нее
        // На последнее место ставим само сообщение без namespaces на случай, если оно уже локализовано и надо его показать в исходном виде
        if (params && params.message) {
            const htmlRegex = /<[a-z][\s\S]*>/gi;
            // Если сообщение содержит что-то, смахивающее на html, то считаем что оно уже локализовано и отображаем как есть.
            // например, если в сообщении есть ссылка на другую заявку.
            if (htmlRegex.test(params.message)) {
                this.message = params.message;
            } else {
                const messageKeys = ValidationMessageModel.getMessageKeys(params.message, i18nextNamespace);
                messageKeys.push(params.message);
                this.message = i18next.t(messageKeys, params);
            }
        } else {
            // Берем ключи от частного к общему. Файл validation ставим на последнее место, поскольку это пережиток от API01
            const messageKeys = ValidationMessageModel.getMessageKeys(errorKey, i18nextNamespace);
            if (controlPath) {
                // Если есть пусть до контрола, то добавляем ключ фича компонента + путь до контрола + название валидации
                messageKeys.unshift(`${i18nextNamespace}:validation.${controlPath}.${errorKey}`);
            }
            this.message = i18next.t(messageKeys, params);
        }
    }
    private static getMessageKeys(errorKey: string, i18nextNamespace: string): string[] {
        return [
            // фича компонента + название валидации
            `${i18nextNamespace}:validation.${errorKey}`,
            // шареный namespace + название валидации
            `${ValidationMessageModel.sharedValidationNamespacePrefix}${errorKey}`
        ];
    }
}
