import { Test } from '@nestjs/testing';
import { TagController } from './location.controller';
import { TagService } from './location.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {LocationEntity} from "./location.entity";

describe('TagController', () => {
  let tagController: TagController;
  let tagService: TagService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([Location])],
      controllers: [TagController],
      providers: [TagService],
    }).compile();

    tagService = module.get<TagService>(TagService);
    tagController = module.get<TagController>(TagController);
  });

  describe('findAll', () => {
    it('should return an array of tags', async () => {
      const tags : Location[] = [];
      const createTag = (id, lat,lng) => {
        const location = new Location();
        location.id = id;
        location.lat = lat;
        location.lng = lng;
        return location;
      }
      tags.push(createTag(1,'',''));
      tags.push(createTag(2, '',''));

      jest.spyOn(tagService, 'findAll').mockImplementation(() => Promise.resolve(tags));
      
      const findAllResult = await tagController.findAll();
      expect(findAllResult).toBe(tags);
    });
  });
});