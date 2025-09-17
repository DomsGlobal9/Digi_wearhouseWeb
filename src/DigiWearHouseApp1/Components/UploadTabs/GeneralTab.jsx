import React from 'react';
import FormInput from '../UploadSectionComponents/FormInput';
import FormSelect from '../UploadSectionComponents/FormSelect';
import ProductTypeToggle from '../UploadSectionComponents/SizeandPricingComps/ProductTypeToggle';
import { 
  DRESS_TYPES, 
  MATERIAL_TYPES, 
  DESIGN_TYPES, 
  CATEGORIES 
} from '../../constants/productConstants';

const GeneralTab = ({ formData, onChange }) => {
  if (!formData) return <div>Loading...</div>;

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-6">
          Product Information
        </h3>
        <div className="space-y-6">
          <FormInput
            label="Product Title"
            value={formData.title || ""}
            onChange={(e) => onChange("title", e.target.value)}
            placeholder="Elegant Women in Pink Floral Traditional Indian Outfit..."
          />
          
          <FormInput
            label="Product Description"
            type="textarea"
            value={formData.description || ""}
            onChange={(e) => onChange("description", e.target.value)}
            placeholder="A stylish, beautiful pink floral lehenga..."
          />
          
          <FormSelect
            label="Category"
            value={formData.category || ""}
            onChange={(e) => onChange("category", e.target.value)}
            options={CATEGORIES}
            placeholder="Choose Category"
          />
          
          <ProductTypeToggle
            value={formData.productType || "Ready to Wear"}
            onChange={(value) => onChange("productType", value)}
          />
          
          <FormSelect
            label="Dress Type"
            value={formData.dressType || ""}
            onChange={(e) => onChange("dressType", e.target.value)}
            options={DRESS_TYPES}
            placeholder="Select Dress"
          />
          
          <FormSelect
            label="Fabric"
            value={formData.fabric || ""}
            onChange={(e) => onChange("fabric", e.target.value)}
            options={MATERIAL_TYPES}
            placeholder="Select Fabric"
          />
          
          <FormSelect
            label="Craft"
            value={formData.craft || ""}
            onChange={(e) => onChange("craft", e.target.value)}
            options={DESIGN_TYPES}
            placeholder="Select Craft"
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralTab;
