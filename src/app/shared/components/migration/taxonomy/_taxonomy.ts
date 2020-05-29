export class TaxonomyOption{

  category:0;

  tax_logic={
    category:0
  };
  tax_single_xpath ={
    category:null
  };
  tax_is_full_search_single={
    category:0
  };
  tax_assign_to_one_term_single={
    category:0
  };

  multiple_term_assing={
    category:0
  };

  tax_multiple_xpath={
    category :null
  };

  tax_multiple_delim={
    category :","
  };

  tax_is_full_search_multiple={
    category:0
  };

  tax_assign_to_one_term_multiple={
    category:0
  }

  tax_hierarchical_logic_entire={
    category:0
  }

  tax_hierarchical_logic_manual={
    category:0,
    list:[
      {
        value:""
        // position:0,
        // father_position:null
      }
    ]
  }
  tax_hierarchical_delim={
    category:","
  }

  tax_hierarchical_assing={
    category:[
      {value:""}
    ]
  }

  is_tax_hierarchical_group_delim = {
    category:0
  }

  tax_hierarchical_last_level_assign={
    category:0
  }


}
