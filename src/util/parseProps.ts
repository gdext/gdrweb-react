export const parseMouseOptions = (options: string) => {

    const buttonAliases = ['left', 'middle', 'right'];
    const buttons = new Set<number>();

    const optionsSpl = options.split(' ');
    for (const option of optionsSpl) {
        const idx = buttonAliases.indexOf(option);
        if (idx === -1) continue;
        buttons.add(idx);
    }

    const containsButton = (button: number) => buttons.has(button);

    return { buttons, containsButton };

}

export const parseWheelOptions = (options: any) => {

    const functionAliases = ['zoom', 'x', 'y'];

    const functions: any = {
        normal: new Set<string>(),
        shift: new Set<string>(),
        ctrl: new Set<string>(),
        alt: new Set<string>()
    }

    for (const key in options) {
        const optionsOne = options[key];
        const optionsSpl = optionsOne.split(' ');
        for (const option of optionsSpl) {
            const idx = functionAliases.indexOf(option);
            if (idx === -1) continue;
            functions[key].add(functionAliases[idx]);
        }
    }

    const getFunction = (keys: string[]) => {
        if (!keys.length) return functions.normal;

        const functionsAll = new Set<string>();
        for (const key of keys) {
            const functionsOne = functions[key];
            for (const func of functionsOne) {
                functionsAll.add(func);
            }
        }

        return functionsAll;
    }

    return { functions, getFunction };
    
}
