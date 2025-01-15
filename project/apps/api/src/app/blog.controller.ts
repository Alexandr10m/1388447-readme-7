import {Controller, UseFilters, UseGuards, UseInterceptors, Post, Body} from "@nestjs/common";
import {AxiosExaptionFilter} from "./filters/axios-exaption.filter";
import {HttpService} from "@nestjs/axios";
import {CheckAuthGaurd} from "./guards/check-auth.gaurd";
import {AddNewPostDto} from "./dto/add-new-post.dto";
import {ApplicationServiceURL} from "./app.config";
import {InjectUserIdInterceptor} from "@project/interceptors";

@Controller('blog')
@UseFilters(AxiosExaptionFilter)
export class BlogController {
  constructor(
    private readonly httpService: HttpService,
  ) {}

  @UseGuards(CheckAuthGaurd)
  @UseInterceptors(InjectUserIdInterceptor)
  @Post('/')
  public async create(@Body() dto: AddNewPostDto) {
    const {data} = await this.httpService.axiosRef.post(`${ApplicationServiceURL.Blog}/`, dto);
    return data;
  }
}
