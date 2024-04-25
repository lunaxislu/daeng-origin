import FileController from '@/components/common/form/input-file/FileController';
import CustomInput from '@/components/common/form/input-text/CustomInput';
import FileInput from '@/components/regist-pet/pet-form/fileInput/FileInput';
import PreviewImage from '@/components/regist-pet/preview-image/PreviewImage';
import { cn } from '@/lib/utils';
import { Fragment } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { PetInfoValuetype } from './PetUpdateModal';

interface I_ModalType {
  modalId?: string;
  petId: string;
  form: UseFormReturn<PetInfoValuetype, any, undefined>;
  PET_INFO_VALUE_GROUP: PetInfoValuetype;
}

const PetModalContent = ({ modalId, petId, form, PET_INFO_VALUE_GROUP }: I_ModalType) => {
  const PET_INFO_TITLE_GROUP = ['이름', '생년월일', '성별', '몸무게', '종류'];

  return (
    <div className={cn('flex justify-start items-center w-[100%] gap-[2.4rem]')}>
      <div className={cn('w-[24rem] h-auto')}>
        <FileController
          name="file"
          control={form.control}
          render={({ base64, register, remove, select, ...props }) => (
            <Fragment>
              <PreviewImage remove={remove} base64={base64} />
              <FileInput register={register} />
            </Fragment>
          )}
        />
      </div>
      <div className={cn('flex flex-wrap justify-start items-start w-[100%] text-[1.8rem] font-[400] gap-[0.8rem]')}>
        {Object.values(PET_INFO_VALUE_GROUP).map((item, index) => {
          return (
            <div className={cn('flex w-[calc(50%-0.4rem)]')} key={Object.keys(PET_INFO_VALUE_GROUP)[index]}>
              <span className={cn('font-[600] mr-[1.6rem]')}>{PET_INFO_TITLE_GROUP[index]}</span>
              <CustomInput control={form.control} name={Object.keys(PET_INFO_VALUE_GROUP)[index]} label=" " />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PetModalContent;
