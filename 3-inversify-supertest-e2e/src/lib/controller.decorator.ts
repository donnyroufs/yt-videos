import { injectable } from "inversify"
import { JsonController } from "routing-controllers"
import { ControllerOptions } from "routing-controllers/types/decorator-options/ControllerOptions"

export function Controller(route?: string, opts?: ControllerOptions) {
  return (target: any) => {
    injectable()(target)
    JsonController(route, opts)(target)
  }
}
