import { ISimpleType, IContext, IValidationResult, Type, typecheck } from "../type"
import { invariant, isPrimitive } from "../../utils"

export class Literal<T> extends Type<T, T> {
    readonly value: any

    constructor(value: any) {
        super("" + value)
        this.value = value
    }

    create(snapshot: any) {
        typecheck(this, snapshot)
        return this.value
    }

    describe() {
        return JSON.stringify(this.value)
    }

    validate(snapshot: any, context: IContext): IValidationResult {
        if (isPrimitive(snapshot) && snapshot === this.value) {
            return []            
        }
        return [{ snapshot, context }]
    }

    get identifierAttribute() {
        return null
    }
}

export function literal<S>(value: S): ISimpleType<S> {
    invariant(isPrimitive(value), `Literal types can be built only on top of primitives`)
    return new Literal<S>(value)
}
