import {Controller, Body, Post, Req, UseFilters} from "@nestjs/common";
import {HttpService} from "@nestjs/axios";
import {LoginUserDto} from "../../../account/src/app/authentication/data-transfer-object/login-user.dto";
import {ApplicationServiceURL} from "./app.config";
import {AxiosExaptionFilter} from "./filters/axios-exaption.filter";

@Controller('users')
@UseFilters(AxiosExaptionFilter)
export class UsersController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.User}/login`, loginUserDto);

    return data;
  }

  @Post('refresh')
  public async refreshToken(@Req() req: Request) {
    const {data} = await this.httpService.axiosRef.put(`${ApplicationServiceURL.User}/refresh`, null, {
      headers: {
        'Authorization': req.headers['authorization'],
      }
    });

    return data;
  }
}
