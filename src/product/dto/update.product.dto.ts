import { Injectable } from "@nestjs/common";
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from "class-validator";

@Injectable()
export class UpdateProductDto {
  @IsString({ message: "Item code must me a string" })
  @IsOptional()
  itemCode;
  @IsString({ message: "Item name must me a string" })
  @IsOptional()
  modelNo;
  @IsString({ message: "Item group must me a string" })
  @IsOptional()
  itemGroupId;
  @IsString({ message: "Item name must me a string" })
  @IsNotEmpty({ message: "Item name should not be empty" })
  itemName;
  @IsString({ message: "Item description must me a string" })
  @IsOptional()
  itemDescription;
  @IsString({ message: "Measurement must me a string" })
  @IsOptional()
  measurementtId;
  @IsNumber({}, { message: "Cost price must be a number" })
  @IsOptional()
  costPrice;
  @IsNumber({}, { message: "Sale price must be a number" })
  @IsOptional()
  salePrice;
  @IsOptional()
  @IsString({ message: "Manufacturer date must be a number" })
  manufactureDate;
  @IsOptional()
  @IsString({ message: "Expire date must be a number" })
  expireDate;
  @IsNumber({}, { message: "Taxe price must be a number" })
  @IsOptional()
  taxRate;
  @IsNumber({}, { message: "Reorder label must be a number" })
  @IsOptional()
  reorderLabel;
  @IsNumber({}, { message: "Supplier must be a number" })
  @IsOptional()
  supplierId;
  @IsString()
  @IsOptional()
  itemImage;
  @IsString({ message: "Remarks must me a string" })
  @IsOptional()
  remarks;
  @IsNumber({}, { message: "Organization must be a number" })
  @IsOptional()
  orgId;
  @IsNotEmpty({ message: "Active Status should not be empty" })
  @IsBoolean({ message: "Active Status must be a boolean value" })
  activeStatus;
}
