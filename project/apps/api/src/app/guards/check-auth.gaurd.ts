import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {ApplicationServiceURL} from "../app.config";

@Injectable()
export class CheckAuthGaurd implements CanActivate {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const {data} = await this.httpService.axiosRef.put(`${ApplicationServiceURL.User}/check`, {}, {
      headers: {
        'Authorization': request.headers['authorization'],
      }
    });

    request['user'] = data;

    return true;
  }
}
