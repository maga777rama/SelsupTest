import { Component } from "react";

interface Param {
    id: number;
    name: string;
    type: "string";
}

interface ParamValue {
    paramId: number;
    value: string;
}

interface Model {
    paramValues: ParamValue[];
}

interface Props {
    params: Param[];
    model: Model;
}

interface State {
    paramValues: ParamValue[];
}

class ParamEditor extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            paramValues: props.model.paramValues,
        };
    }

    handleChange = (paramId: number, value: string) => {
        this.setState((prevState) => ({
            paramValues: prevState.paramValues.map((param) =>
                param.paramId === paramId ? { ...param, value } : param
            ),
        }));
    };

    public getModel(): Model {
        return { paramValues: this.state.paramValues };
    }

    render() {
        return (
            <div>
                <h3>Редактор параметров</h3>
                {this.props.params.map((param) => {
                    const paramValue = this.state.paramValues.find(
                        (p) => p.paramId === param.id
                    );
                    return (
                        <div key={param.id}>
                            <label>{param.name}:</label>
                            <input
                                type="text"
                                value={paramValue?.value || ""}
                                onChange={(e) => this.handleChange(param.id, e.target.value)}
                            />
                        </div>
                    );
                })}
                <button onClick={() => console.log(this.getModel())}>Вывести Model</button>
            </div>
        );
    }
}

const params: Param[] = [
    { id: 1, name: "Назначение", type: "string" },
    { id: 2, name: "Длина", type: "string" }
];

const model: Model = {
    paramValues: [
        { paramId: 1, value: "повседневное" },
        { paramId: 2, value: "макси" }
    ]
};

// импортируется в main.tsx
export const App = () => (
    <div>
        <ParamEditor params={params} model={model} />
    </div>
);